from rest_framework import serializers
from mailmanagements import models as md
from accounting import validators as v
from django.core import exceptions
from django.contrib.auth import get_user_model
from accounting.models import Profile

User = get_user_model()

# سریالایزرهای قبلی (OfficeModelSerializer, SecretariatModelSerializer, و غیره)
class OfficeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = md.Office
        fields = ["id", "name", "address", "department", "created_at", "updated_at"]

class SecretariatModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = md.Secretariat
        fields = ["id", "name", "department", "office", "members", "created_at", "updated_at"]

class MailCategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = md.MailCategory
        fields = ["id", "name", "is_incoming", "is_outgoing", "description", "created_at", "updated_at"]

class MailModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = md.Mail
        fields = ["id", "secretariat", "category", "company", "header_size", "subject", "content", "sender", "recipients", "mail_number", "signature_image", "is_signed", "created_at", "updated_at", "is_draft", "is_confidential", "is_urgent", "notify_by_sms", "notify_by_email"]

class MailRecipientModelSerializer(serializers.Serializer):
    recipient = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        fields = ['recipient']
        read_only_fields = []

    def validate_recipient(self, value):
        if v.validate_iranian_cellphone_number(value):
            try:
                profile = Profile.objects.get(phone_number=value)
                user = profile.user
                return user
            except Profile.DoesNotExist:
                raise serializers.ValidationError({
                    "message": "کاربری با این شماره موبایل یافت نشد",
                    "status": 404,
                    "code": "user_not_found"
                })
        elif v.is_valid_email(value):
            try:
                user = User.objects.get(email=value)
                return user
            except User.DoesNotExist:
                raise serializers.ValidationError({
                    "message": "کاربری با این ایمیل یافت نشد",
                    "status": 404,
                    "code": "user_not_found"
                })
        else:
            raise serializers.ValidationError({
                "message": "آدرس گیرنده باید ایمیل یا شماره موبایل معتبر باشد",
                "status": 400,
                "code": "invalid_recipient_address"
            })

    def to_representation(self, instance):
        serializer = MailModelSerializer(instance, many=True)
        return serializer.data

class CreateMailSerializer(serializers.ModelSerializer):
    recipients = MailRecipientModelSerializer(many=True)

    class Meta:
        model = md.Mail
        fields = [
            "secretariat", "category", "company", "header_size", "subject", "content",
            "recipients", "signature_image", "is_signed", "is_draft",
            "is_confidential", "is_urgent", "notify_by_sms", "notify_by_email",
            "id", "mail_number", "created_at", "updated_at"
        ]
        read_only_fields = ["id", "sender", "mail_number", "created_at", "updated_at"]

    def validate(self, data):
        # اعتبارسنجی secretariat
        secretariat = data.get("secretariat")
        if secretariat and not secretariat.members.filter(id=self.context['request'].user.id).exists():
            raise serializers.ValidationError({
                "message": "کاربر جاری عضو این دبیرخانه نیست",
                "error": True,
                "status": 403,
                "code": "user_not_secretariat_member"
            })
        return data

    def create(self, validated_data):
        # جدا کردن recipients از داده‌های معتبر
        recipients_data = validated_data.pop('recipients')
        # تنظیم sender به کاربر جاری
        validated_data['sender'] = self.context['request'].user
        # ایجاد نامه
        mail = md.Mail.objects.create(**validated_data)
        # اضافه کردن گیرندگان
        for recipient_data in recipients_data:
            mail.recipients.add(recipient_data['recipient'])
        return mail

    def to_representation(self, instance):
        # استفاده از MailModelSerializer برای خروجی
        return MailModelSerializer(instance).data
    
