from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User, Profile
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer, PasswordResetSerializer
from django.core.mail import send_mail
from django.conf import settings
import uuid

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

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "User registered successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)

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