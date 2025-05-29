from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from .models import User, Profile,TempCodeAuthenticating
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer, PasswordResetSerializer
from django.core.mail import send_mail
from django.conf import settings
import uuid
import re
from django.shortcuts import get_object_or_404
from .tasks import sendEmail
from rest_framework.response import Response
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("Only superusers can create users")
        serializer.save()

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

class RegisterView(generics.GenericAPIView):
    """
    This Class For Registration Inherients fron GenericApi
    can do POST for Api and use determine serializer class
    """

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        """
        this class for process registration flow
        validate posted values whit serializer
        and response whit status code
        """
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            email = serializer.validated_data["email"]
            user_obj = get_object_or_404(User,email=email)
            temp_code = TempCodeAuthenticating(user=user_obj)
            raw_code = temp_code.save()
            sendEmail.delay(
                template="email/registration_temp_code.tpl",
                context={"temp_code": raw_code},
                from_email="IT_department@nakhlearg.ir",
                recipient_list=(email,),
            )
            data = {
                "email": email, 
                "message": "کاربر با موفقیت ثبت شد. کد فعالسازی موقت به ایمیل ثبت شده ارسال شد.",
                "status": "success",
                "code": "user_created",
                "Error": False

                }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_200_OK)

class ForgotPasswordView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.get(email=email)
        token = str(uuid.uuid4())
        user.token = token  # فرض می‌کنیم یه فیلد token به مدل User اضافه کنی
        user.save()
        send_mail(
            'Reset Your Password',
            f'Click this link to reset your password: http://localhost:8000/accounting/api/v1/reset-password/{token}/',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        return Response({"message": "Password reset link sent"}, status=status.HTTP_200_OK)

class ResetPasswordView(generics.GenericAPIView):
    def post(self, request, token, *args, **kwargs):
        try:
            user = User.objects.get(token=token)
            password = request.data.get('password')
            user.set_password(password)
            user.token = None  # پاک کردن توکن بعد از استفاده
            user.save()
            return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)