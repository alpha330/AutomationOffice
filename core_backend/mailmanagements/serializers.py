from rest_framework import serializers
from mailmanagements import models as md
from accounting import validators as v
from django.core import exceptions
from django.contrib.auth import get_user_model
from accounting.models import Profile

User = get_user_model()

class OfficeModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Office
        fields=["id","name","address", "department", "created_at" ,"updated_at"]
        
        
class SecretariatModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Secretariat
        fields=["id","name","department" ,"office", "members","created_at", "updated_at"]
        
class MailCategoryModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.MailCategory
        fields=["id","name","is_incoming" ,"is_outgoing", "description", "created_at", "updated_at"]
        
class MailModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Mail
        fields=["id","secretariat" ,"category", "company" ,"header_size", "subject" ,"content" ,"sender", "recipients", "mail_number", "signature_image", "is_signed" ,"created_at", "updated_at" ,"is_draft","is_confidential", "is_urgent", "notify_by_sms", "notify_by_email"]

class MailRecipientModelSerializer(serializers.Serializer):
    recipient = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        fields = ['recipient']
        read_only_fields = []

    def validate_recipient(self, value):
        # اعتبارسنجی ایمیل (username) یا شماره موبایل
        if v.validate_iranian_cellphone_number(value):
            try:
                # پیدا کردن کاربر بر اساس شماره موبایل در مدل Profile
                profile = Profile.objects.get(phone_number=value)
                user = profile.user  # دسترسی به کاربر از طریق ForeignKey
                return user
            except Profile.DoesNotExist:
                raise serializers.ValidationError({
                    "message": "کاربری با این شماره موبایل یافت نشد",
                    "error": True,
                    "status": 404,
                    "code": "user_not_found"
                })
        elif v.is_valid_email(value):
            try:
                # پیدا کردن کاربر بر اساس username (که ایمیل هست)
                user = User.objects.get(email=value)
                return user
            except User.DoesNotExist:
                raise serializers.ValidationError({
                    "message": "کاربری با این ایمیل یافت نشد",
                    "error": True,
                    "status": 404,
                    "code": "user_not_found"
                })
        else:
            raise serializers.ValidationError({
                "message": "آدرس گیرنده باید ایمیل یا شماره موبایل معتبر باشد",
                "error": True,
                "status": 400,
                "code": "invalid_recipient_address"
            })

    def to_representation(self, instance):
        # instance لیست نامه‌هاست که توی ویو به دست میاد
        serializer = MailModelSerializer(instance, many=True)
        return serializer.data
    