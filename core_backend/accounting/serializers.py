from rest_framework import serializers
from .models import User, Profile, UserType
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
import uuid
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'type', 'is_active', 'is_verified', 'created_date']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'phone_number', 'image', 'created_date']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'type']

    def validate(self, data):
        # چک کردن تطابق پسوردها
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})

        # چک کردن پیچیدگی پسورد
        password = data['password']
        if not re.search(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', password):
            raise serializers.ValidationError({
                "password": (
                    "Password must be at least 8 characters long and include at least one "
                    "lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)."
                )
            })

        return data

    def create(self, validated_data):
        # حذف confirm_password از داده‌ها قبل از ذخیره
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            type=validated_data.get('type', UserType.client.value)
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        if not User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("User with this email does not exist")
        return data