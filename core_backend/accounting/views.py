from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from .models import User, Profile,TempCodeAuthenticating,UserLoginDevice
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer, PasswordResetSerializer,ActivationTempCodeSerializer,ProfileSerializerUpdate,TempAuthenticatingSerializer,UserLoginDeviceSerializer,ResetPasswordViaLinkSerializer
from django.core.mail import send_mail
from django.conf import settings
import uuid
import re
from django.shortcuts import get_object_or_404
from .tasks import sendEmail
from rest_framework.response import Response
from rest_framework import status,permissions
from user_agents import parse
from rest_framework.exceptions import NotFound
from .validators import validate_iranian_cellphone_number,is_valid_email
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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

class TempAuthenticatingViewSet(viewsets.ModelViewSet):
    queryset = TempCodeAuthenticating.objects.all()
    serializer_class = TempAuthenticatingSerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser] 

    def get_queryset(self):
        if self.request.user.is_superuser:
            return TempCodeAuthenticating.objects.all()
        return TempCodeAuthenticating.objects.filter(user=self.request.user.email)

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("Only superusers can create TempCodeAuthenticating")
        serializer.save()

class UserLoginDeviceViewSet(viewsets.ModelViewSet):
    queryset = UserLoginDevice.objects.all()
    serializer_class = UserLoginDeviceSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return UserLoginDevice.objects.all()
        return UserLoginDevice.objects.filter(user=self.request.user.email)

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("Only superusers can create UserLoginDevice")
        serializer.save()

class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class MyProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            raise NotFound("پروفایلی برای این کاربر یافت نشد.")
        
class MyProfileUpdateView(generics.UpdateAPIView):
    serializer_class = ProfileSerializerUpdate
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['patch']
    parser_classes = [MultiPartParser, FormParser]  

    def get_object(self):
        queryset = Profile.objects.filter(user=self.request.user)
        obj = get_object_or_404(queryset)
        return obj

    @swagger_auto_schema(
        request_body=ProfileSerializerUpdate,  
        operation_description="بروزرسانی پروفایل کاربر شامل نام، تصویر، امضا و تاریخ تولد"
    )
    def patch(self, request, *args, **kwargs):
        print("FILES:", request.FILES)         # 👈 چاپ کن ببینی چیزی توش هست؟
        print("image:", request.FILES.get('image'))
        print("signitures:", request.FILES.get('signitures'))
        response = super().partial_update(request, *args, **kwargs)

        custom_response = {
            "message": "پروفایل شما با موفقیت به‌روزرسانی شد.",
            "error": False,
            "status": "success",
            "code": "Profile updated",
            "data": response.data
        }

        return Response(custom_response, status=status.HTTP_200_OK)
    

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
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)
            ip_address = self.request.META.get("REMOTE_ADDR")
            user_agent = parse(self.request.META["HTTP_USER_AGENT"])
            browser = user_agent.browser.family
            device = user_agent.device.family
            UserLoginDevice.objects.create(
                 user=user,
                 ip_address=ip_address,
                 browser=browser,
                 device=device,
             )
            return Response({
                "token": token.key, 
                "user_id": user.id,
                "email":user.email,
                "type":user.type,
                "message": "ورود تایید شد",
                "status": "success",
                "code": "login_done",
                "Error": False
            }, 
            status=status.HTTP_200_OK
            )
        except :
            return Response({
                "message":"نام کاربری یا رمز عبور اشتباه است. ورود نا موفق ", 
                "status": "fail",
                "code": "Wrong username or password",
                "Error": True
            }, 
            status=status.HTTP_401_UNAUTHORIZED
            )
    

class ForgotPasswordView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.get(email=email)
        token = str(uuid.uuid4())
        user.token = token  # فرض می‌کنیم یه فیلد token به مدل User اضافه کنی
        user.save()
        sendEmail.delay(
                template="email/reset_link_Password.tpl",
                context={"token": token},
                from_email="IT_department@nakhlearg.ir",
                recipient_list=(email,),
        )
        return Response({
                "message":"لینک بازنشانی رمز عبور ارسال شد", 
                "status": "success",
                "code": "reset link created",
                "Error": False
            }, 
            status=status.HTTP_201_CREATED
            )

class VerifyLoggedInUser(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, token, *args, **kwargs):
       user = User.objects.get(token=token)
       print(f"USER : {user}")
       if user:
           return Response({
               "message":"کاربر لاگین میباشد", 
                "status": "success",
                "code": "Token Has Been Verified",
                "Error": False
                }, 
                status=status.HTTP_200_OK
            )

class ResetPasswordView(generics.GenericAPIView):
    serializer_class=ResetPasswordViaLinkSerializer
    permission_classes = [AllowAny]
    def post(self, request, token, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = User.objects.get(token=token)
                password = request.data.get('password')
                user.set_password(password)
                user.token = None  # پاک کردن توکن بعد از استفاده
                user.save()
                return Response({
                    "message":"رمز عبور تغییر پیدا کرد", 
                    "status": "success",
                    "code": "Password Changed",
                    "Error": False
                    }, 
                    status=status.HTTP_201_CREATED
                    )
            except User.DoesNotExist:
                return Response({
                    "message":"توکن منقضی شده است", 
                    "status": "fail",
                    "code": "Token Expired",
                    "Error": True
                }, 
                status=status.HTTP_400_BAD_REQUEST
                )
            
        
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
    
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            request.user.auth_token.delete()
            device = UserLoginDevice.objects.filter(user=request.user)
            if device.exists():
                device.delete()  # حذف دستگاه‌های کاربر در صورت وجود
            return Response({
                "message": "با موفقیت خارج شدید.",
                "status": "success",
                "code": "logout_done",
                "Error": False
            }, status=status.HTTP_204_NO_CONTENT)
        except (AttributeError, Token.DoesNotExist):
            return Response({
                "message": "شما وارد نشده‌اید یا توکن نامعتبر است.",
                "status": "fail",
                "code": "logout_failed",
                "Error": True
            }, status=status.HTTP_400_BAD_REQUEST)