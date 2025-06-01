from django.db import models
from django.core.validators import RegexValidator, FileExtensionValidator
from django_jalali.db import models as jmodels  # نیاز به نصب django-jalali
from accounting.models import Profile
from django.core.validators import RegexValidator



class Company(models.Model):
    name = models.CharField(max_length=255, verbose_name="نام شرکت",unique=True)

    logo = models.ImageField(
        upload_to='company/logos/',
        verbose_name="لوگو شرکت",
        null=True,
        blank=True
    )

    letterhead_a4 = models.FileField(
        upload_to='company/letterheads/',
        verbose_name="سربرگ A4",
        validators=[FileExtensionValidator(allowed_extensions=['doc', 'docx'])],
        null=True,
        blank=True
    )

    letterhead_sh5 = models.FileField(
        upload_to='company/letterheads/',
        verbose_name="سربرگ ش5",
        validators=[FileExtensionValidator(allowed_extensions=['doc', 'docx'])],
        null=True,
        blank=True
    )

    national_id = models.CharField(
        max_length=11,
        validators=[
            RegexValidator(r'^\d{11}$', 'شناسه ملی باید ۱۱ رقم باشد.')
        ],
        verbose_name="شناسه ملی"
    )

    economic_code = models.CharField(
        max_length=12,
        validators=[
            RegexValidator(r'^\d{12}$', 'کد اقتصادی باید ۱۲ رقم باشد.')
        ],
        verbose_name="کد اقتصادی",
        unique=True
    )

    establishment_date = jmodels.jDateField(
        verbose_name="تاریخ تأسیس",
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name
    
class Priority(models.Model):
    level = models.PositiveSmallIntegerField(
        verbose_name="سطح ارجحیت",
        unique=True,
        choices=[(i, f"اولویت {i}") for i in range(1, 11)],
        help_text="۱ = بالاترین ارجحیت، ۱۰ = کمترین"
    )

    def __str__(self):
        return f"اولویت {self.level}"
    
class DepartmentType(models.Model):
    title = models.CharField(max_length=100, unique=True, verbose_name="عنوان واحد")

    def __str__(self):
        return self.title


class Department(models.Model):
    department_type = models.ForeignKey(
        DepartmentType,
        on_delete=models.CASCADE,
        verbose_name="نوع واحد"
    )
    company = models.ForeignKey(
        'Company',
        on_delete=models.CASCADE,
        related_name='departments',
        verbose_name="شرکت"
    )
    priority = models.ForeignKey(
        'Priority',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="اولویت سازمانی"
    )

    def __str__(self):
        return f"{self.department_type} - {self.company}"
    
class PositionType(models.Model):
    title = models.CharField(max_length=100, unique=True, verbose_name="عنوان سمت")
    
    def __str__(self):
        return self.title
    
class ProfilePosition(models.Model):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='positions',
        verbose_name="پروفایل"
    )
    department_position = models.ForeignKey(
        'DepartmentPosition',
        on_delete=models.CASCADE,
        related_name='profiles',
        verbose_name="سمت در دپارتمان"
    )
    assigned_date = models.DateField(
        auto_now_add=True,
        verbose_name="تاریخ اختصاص"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="فعال"
    )

    class Meta:
        unique_together = ('profile', 'department_position')

    def __str__(self):
        return f"{self.profile.get_fullname()} - {self.department_position}"

    
    
class DepartmentPosition(models.Model):
    department = models.ForeignKey(
        'Department',
        on_delete=models.CASCADE,
        related_name='positions',
        verbose_name="دپارتمان"
    )
    position_type = models.ForeignKey(
        'PositionType',
        on_delete=models.CASCADE,
        verbose_name="نوع سمت"
    )
    priority = models.ForeignKey(
        'Priority',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="اولویت سمت"
    )

    is_active = models.BooleanField(default=True, verbose_name="فعال است")

    class Meta:
        unique_together = ('department', 'position_type')

    def __str__(self):
        return f"{self.position_type.title} در {self.department}"
    

LOCATION_TYPES = [
    ("headquarter", "ستاد مرکزی"),
    ("branch", "شعبه"),
    ("warehouse", "انبار"),
    ("factory", "کارخانه"),
    ("office", "دفتر"),
]

iran_phone_validator = RegexValidator(
    regex=r'^0\d{10}$',
    message="شماره تلفن باید با ۰ شروع شده و ۱۱ رقم باشد."
)

postal_code_validator = RegexValidator(
    regex=r'^\d{10}$',
    message="کد پستی باید ۱۰ رقم باشد."
)


class CompanyLocation(models.Model):
    name = models.CharField(max_length=255, verbose_name="نام محل (اختیاری)", blank=True, null=True)

    country = models.CharField(max_length=100, verbose_name="کشور", default="ایران")
    province = models.CharField(max_length=100, verbose_name="استان")
    city = models.CharField(max_length=100, verbose_name="شهر")

    postal_code = models.CharField(
        max_length=10,
        validators=[postal_code_validator],
        verbose_name="کد پستی"
    )

    location_type = models.CharField(
        max_length=20,
        choices=LOCATION_TYPES,
        verbose_name="نوع محل"
    )

    phone_number = models.CharField(
        max_length=11,
        validators=[iran_phone_validator],
        verbose_name="شماره تلفن"
    )

    fax_number = models.CharField(
        max_length=11,
        validators=[iran_phone_validator],
        verbose_name="شماره فکس",
        blank=True,
        null=True
    )

    members = models.ManyToManyField(
        Profile,
        related_name="locations",
        blank=True,
        verbose_name="پروفایل‌های مرتبط"
    )

    def __str__(self):
        return f"{self.get_location_type_display()} - {self.city}"
