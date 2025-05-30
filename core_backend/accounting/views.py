from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from .models import User, Profile,TempCodeAuthenticating
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer, PasswordResetSerializer,ActivationTempCodeSerializer
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
        
class ActivationApiCodeView(generics.GenericAPIView):
    
    model = User
    serializer_class = ActivationTempCodeSerializer
    permission_classes = [AllowAny]
    
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            temp_code = serializer.data.get("temp_code")
            user_id = TempCodeAuthenticating.verify_code(raw_code=temp_code)
            code_model = TempCodeAuthenticating.objects.filter(user=user_id).order_by("-created_date").first()
            if user_id:
                user_obj = User.objects.get(email=user_id)
                if user_obj.is_active:
                    return Response({
                        "message": "اکانت فعال بوده است",
                        "email":user_obj.email,
                        "error":True,
                        "status":"fail",
                        "code":"activated_before"
                        })
                else:
                    user_obj.is_active = True
                    user_obj.save()
                    TempCodeAuthenticating.objects.filter(user=user_id).delete()
                    return Response({
                        "message": "اکانت فعال شد",
                        "email":user_obj.email,
                        "error":False,
                        "status":"success",
                        "code":"acivated"
                        },
                        status=status.HTTP_202_ACCEPTED
                        )            
            else:
                return Response({
                "message": "کد منقضی شده است",
                "error":True,
                "status":"fail",
                "code":"temp_code_disqualify"
                },
                status=status.HTTP_425_TOO_EARLY)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)