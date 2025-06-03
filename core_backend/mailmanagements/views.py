from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from rest_framework import viewsets, generics, status
from mailmanagements import models as md
from mailmanagements import serializers as sz
from rest_framework.response import Response

# Create your views here.

class OfficeViewSet(viewsets.ModelViewSet):
    queryset = md.Office.objects.all()
    serializer_class = sz.OfficeModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.Office.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به تعریف دفتر شرکت است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به تعریف دفتر شرکت است")
        serializer.save()
        
class SecretariatViewSet(viewsets.ModelViewSet):
    queryset = md.Secretariat.objects.all()
    serializer_class = sz.SecretariatModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.Secretariat.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به تعریف دبیرخانه است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به تعریف دبیرخانه است")
        serializer.save()
        
        
class MailCategoryViewSet(viewsets.ModelViewSet):
    queryset = md.MailCategory.objects.all()
    serializer_class = sz.MailCategoryModelSerializer
    permission_classes = [IsAdminUser,IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.MailCategory.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به دسته بندی نامه ها است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به دسته بندی نامه ها است")
        serializer.save()
        
class MailViewSet(viewsets.ModelViewSet):
    queryset = md.Mail.objects.all()
    serializer_class = sz.MailModelSerializer
    permission_classes = [IsAdminUser,IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.Mail.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به نامه ادمینی است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به نامه ادمینی است")
        serializer.save()

class MailRecipientViewSet(generics.GenericAPIView):
    serializer_class = sz.MailRecipientModelSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # کاربر معتبر از سریالایزر
        user = serializer.validated_data['recipient']
        
        # پیدا کردن نامه‌هایی که کاربر گیرنده‌شونه
        mails = md.Mail.objects.filter(
            recipients=user,
            is_draft=False
        ).select_related('secretariat', 'category', 'company', 'sender').prefetch_related('recipients').order_by('-created_at')
        
        # سریالایز کردن نامه‌ها
        data = serializer.to_representation(mails)
        
        return Response({
            "data": data,
            "message": "لیست نامه‌ها با موفقیت دریافت شد",
            "error": False,
            "status": 200
        }, status=status.HTTP_200_OK)
