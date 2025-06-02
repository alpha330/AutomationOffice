from django.db import models
from accounting.models import User
from officeorganization.models import Department, Company
from django.utils import timezone
import jdatetime
from docx import Document
from django.core.files.storage import default_storage


class Office(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="نام دفتر")
    address = models.TextField(verbose_name="آدرس")
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='offices', verbose_name="واحد سازمانی")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")

    class Meta:
        verbose_name = "دفتر"
        verbose_name_plural = "دفاتر"

    def __str__(self):
        return self.name

class Secretariat(models.Model):
    name = models.CharField(max_length=100, verbose_name="نام دبیرخانه")
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='secretariats', verbose_name="واحد سازمانی")
    office = models.ForeignKey(Office, on_delete=models.CASCADE, related_name='secretariats', verbose_name="دفتر")
    members = models.ManyToManyField(User, related_name='secretariats', verbose_name="اعضای دبیرخانه")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")

    class Meta:
        verbose_name = "دبیرخانه"
        verbose_name_plural = "دبیرخانه‌ها"

    def __str__(self):
        return self.name

class MailCategory(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="نام دسته‌بندی")
    is_incoming = models.BooleanField(default=False, verbose_name="نامه وارد")
    is_outgoing = models.BooleanField(default=False, verbose_name="نامه صادره")
    description = models.TextField(blank=True, null=True, verbose_name="توضیحات")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")

    class Meta:
        verbose_name = "دسته‌بندی نامه"
        verbose_name_plural = "دسته‌بندی‌های نامه"

    def __str__(self):
        return self.name

class Mail(models.Model):
    secretariat = models.ForeignKey(Secretariat, on_delete=models.CASCADE, related_name='mails', verbose_name="دبیرخانه")
    category = models.ForeignKey(MailCategory, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="دسته‌بندی")
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="شرکت")
    header_size = models.CharField(max_length=2, choices=[('A5', 'A5'), ('A4', 'A4')], default='A4', verbose_name="اندازه سربرگ")
    subject = models.CharField(max_length=200, verbose_name="موضوع")
    content = models.TextField(verbose_name="محتوا")
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sent_mails', verbose_name="فرستنده")
    recipients = models.ManyToManyField(User, related_name='received_mails', verbose_name="گیرندگان")
    mail_number = models.CharField(max_length=20, unique=True, editable=False, verbose_name="شماره نامه")
    signature_image = models.ImageField(upload_to='mail_signatures/', blank=True, null=True, verbose_name="عکس امضا")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ به‌روزرسانی")
    is_draft = models.BooleanField(default=False, verbose_name="پیش‌نویس")
    is_urgent = models.BooleanField(default=False, verbose_name="فوری")

    def save(self, *args, **kwargs):
        if not self.mail_number:
            jalali_date = jdatetime.date.fromgregorian(date=timezone.now().date())
            year = jalali_date.year
            month = str(jalali_date.month).zfill(2)
            day = str(jalali_date.day).zfill(2)
            date_part = f"{year}{month}{day}"
            letter_type = "د" if self.category and self.category.is_outgoing else "خ"
            last_mail = Mail.objects.filter(category=self.category, secretariat=self.secretariat).order_by('-mail_number').first()
            sequence = last_mail.mail_number.split('/')[-1] if last_mail else "00000"
            next_sequence = str(int(sequence) + 1).zfill(5)
            self.mail_number = f"{date_part}/{letter_type}/{next_sequence}"
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "نامه"
        verbose_name_plural = "نامه‌ها"

    def __str__(self):
        return f"{self.mail_number} - {self.subject}"

    @property
    def header_file(self):
        if self.company:
            return self.company.a5_header if self.header_size == 'A5' else self.company.a4_header
        return None