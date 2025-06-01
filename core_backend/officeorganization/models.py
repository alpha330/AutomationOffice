from django.db import models
from django.core.validators import RegexValidator, FileExtensionValidator
from django_jalali.db import models as jmodels  # نیاز به نصب django-jalali
from accounting.models import Profile



class Company(models.Model):
    name = models.CharField(max_length=255, verbose_name="نام شرکت")

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
        verbose_name="کد اقتصادی"
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
