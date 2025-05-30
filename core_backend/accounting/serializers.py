from rest_framework import serializers
from .models import User, Profile, TempCodeAuthenticating
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
import uuid
import re
from django.shortcuts import get_object_or_404

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'type', 'is_active', 'is_verified', 'created_date']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'phone_number', 'image', 'created_date']

class ProfileSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [ 'first_name', 'last_name', 'phone_number', 'image']

class RegisterSerializer(serializers.ModelSerializer):
    """
    this class handle Registration new users
    password_1 = repeated main password
    mobile_number = user mobile number required as username
    email = user email address require

    """

    password_1 = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        """
        mother class or meta inheriented from User defined class
        in auth.models
        with fields get from indexs of user table
        """

        model = User
        fields = ["email", "password", "password_1"]

    def validate(self, attrs):
        """
        this section about validating policy of passwords
        complexity like minimum character
        special charecters and uppercase
        """
        emailCheck = User.objects.filter(email=attrs.get("email")).exists()
        if emailCheck:
            raise serializers.ValidationError(
                {
                    "message": "این ایمیل قبلا ثبت شده است",
                    "Error": True,
                    "status": 400,
                    "code": "email_already_exists"
                }
            )
        if attrs.get("password") != attrs.get("password_1"):
            raise serializers.ValidationError(
                {
                    "message": "رمز عبور و تکرار رمز عبور یکسان نیست",             
                    "Error": True,
                    "status": 400,
                    "code": "password_mismatch"                    
                 }
            )
        
        try:
            validate_password(attrs.get("password"))
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return super().validate(attrs)

    def create(self, validated_data):
        """
        this defination to develope user via create_user() def
        in auth.models by inserted data by client

        """
        validated_data.pop("password_1", None)
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = authenticate(email=data['email'], password=data['password'])
            if user and user.is_active:
                return user
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"login": list(e.messages)})
        return super().validate(data)

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        if not User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("User with this email does not exist")
        return data
    
class ActivationTempCodeSerializer(serializers.Serializer):
    """
    This class is used to serialize the User model in order Activate user instance
    """
    temp_code = serializers.IntegerField(required=True)
