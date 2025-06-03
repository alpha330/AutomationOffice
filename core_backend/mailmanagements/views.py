from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from rest_framework import viewsets, generics, status
from mailmanagements import models as md
from mailmanagements import serializers as sz

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
        