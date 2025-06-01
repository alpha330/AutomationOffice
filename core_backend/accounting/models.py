from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from accounting.validators import validate_iranian_cellphone_number
import uuid
import random
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from datetime import timedelta
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist


# USER MODEL FOR EMARKET IN APP ACCOUNTING

class UserType(models.IntegerChoices):
    client = 1, _("client")
    admin = 2, _("admin")
    superuser = 3, _("superuser")

class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_verified", True)
        extra_fields.setdefault("type", UserType.superuser.value)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    type = models.IntegerField(
        choices=UserType.choices, default=UserType.client.value
    )

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    token = models.UUIDField(null=True, blank=True, unique=True, default=uuid.uuid4)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
    
def avatar_media_path(instance, filename):
    return f"auth/users/profile/{instance.user.email}/avatar/{filename}"

def signuture_media_path(instance, filename):
    return f"auth/users/profile/{instance.user.email}/signuture/{filename}"

class Profile(models.Model):
    user = models.OneToOneField(
        "User", on_delete=models.CASCADE, related_name="user_profile"
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=12, validators=[validate_iranian_cellphone_number],unique=True,null=True
    )
    image = models.ImageField(
        upload_to=avatar_media_path, default="img/mockups/default_man.png"
    )
    signitures = models.ImageField(
        upload_to=signuture_media_path, default="img/mockups/default_man.png"
    )
    
    date_of_birth = models.DateField(null=True,default="1984-12-01")
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    def get_current_positions(self):
        return self.positions.filter(is_active=True)

    def get_fullname(self):
        if self.first_name or self.last_name:
            return self.first_name + " " + self.last_name
        return "کاربر جدید"

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

class TempCodeAuthenticating(models.Model):
    """
    This Model Created For Store Authenticating with Temp Code
    With Dynamic Expiration Date

    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="temp_code_user"
    )
    code = models.CharField(max_length=128)  # برای ذخیره هش
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    expire_time = models.DateTimeField(null=True, blank=True)  # زمان انقضای کد

    def __str__(self):
        return f"Temp code for {self.user.email} - {self.code}"

    def save(self, *args, **kwargs):
        # تولید یک کد 5 رقمی تصادفی
        raw_code = str(random.randint(10000, 99999))
        # هش کردن کد قبل از ذخیره‌سازی
        self.code = make_password(raw_code)
        # تنظیم زمان انقضا به 4 دقیقه بعد
        self.expire_time = timezone.now() + timedelta(minutes=15)
        super().save(*args, **kwargs)
        return raw_code  # برگرداندن کد خام

    def is_expired(self):
        """بررسی انقضای کد."""
        return timezone.now() > self.expire_time

    def check_code(self, raw_code):
        """بررسی صحت کد در صورتی که منقضی نشده باشد."""
        if self.is_expired():
            return False
        return check_password(raw_code, self.code)
    
    @classmethod
    def verify_code(cls, raw_code):
        """
        دریافت کد خام و بررسی اعتبار آن.
        در صورت صحیح بودن کد و عدم انقضا، شیء کاربر را برمی‌گرداند.
        """
        try:
            # جستجوی تمام نمونه‌ها و بررسی تطابق کد
            for temp_code_instance in cls.objects.all():
                if temp_code_instance.check_code(raw_code):
                    return temp_code_instance.user  # بازگرداندن کاربر مرتبط
            return None  # کد یافت نشد یا منقضی شده است

        except ObjectDoesNotExist:
            return None  # هیچ کدی برای کاربر یافت نشد

    def get_api_absloute_url(self):
        return reverse("auths:api-v1:codes-viewset-detail",kwargs={"pk":self.id})
    
class UserLoginDevice(models.Model):
    """
    This Model To Store Loged In User Attrebutes
    Help To Mange Online User at Same Time on Multiple Devices
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="login_devices")
    ip_address = models.CharField(max_length=45)
    browser = models.CharField(max_length=100)
    device = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        This Definitain Work To Return The Main Ident Of Model on Admins Or Another
        playses like as admins
        """
        return f"{self.user.email} - {self.device} ({self.browser})"
    
    def get_api_absloute_url(self):
        return reverse("auths:api-v1:devices-viewset-detail",kwargs={"pk":self.id})


