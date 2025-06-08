from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from rest_framework import viewsets, generics, status
from mailmanagements import models as md
from mailmanagements import serializers as sz
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

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

class CheckMailRecipientView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        # گرفتن فیلترهای اختیاری از بدنه
        is_urgent = request.data.get('is_urgent', None)
        is_confidential = request.data.get('is_confidential', None)

        # کوئری پایه
        queryset = md.Mail.objects.filter(recipients=user, is_draft=False)
        if is_urgent is not None:
            queryset = queryset.filter(is_urgent=is_urgent)
        if is_confidential is not None:
            queryset = queryset.filter(is_confidential=is_confidential)

        mails = queryset.select_related('secretariat', 'category', 'company', 'sender').prefetch_related('recipients').order_by('-created_at')
        is_recipient = mails.exists()
        data = []
        if is_recipient:
            serializer = sz.MailModelSerializer(mails, many=True)
            data = serializer.data

        return Response({
            "data": {
                "is_recipient": is_recipient,
                "mails": data
            },
            "message": "وضعیت گیرنده بودن کاربر و لیست نامه‌ها با موفقیت دریافت شد",
            "error": False,
            "status": 200
        }, status=status.HTTP_200_OK)
    
class CheckMailSendView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # کاربر احراز هویت‌شده
        user = request.user

        # پیدا کردن نامه‌هایی که کاربر گیرنده‌شونه
        mails = md.Mail.objects.filter(
            sender=user,
            is_draft=False
        ).select_related('secretariat', 'category', 'company', 'recipients').prefetch_related('sender').order_by('-created_at')

        # چک کردن اینکه آیا نامه‌ای وجود داره یا نه
        is_sender = mails.exists()

        # سریالایز کردن نامه‌ها (اگه وجود داشته باشن)
        data = []
        if is_sender:
            serializer = sz.MailModelSerializer(mails, many=True)
            data = serializer.data

        return Response({
            "data": {
                "is_sender": is_sender,
                "mails": data
            },
            "message": "وضعیت گیرنده بودن کاربر و لیست نامه‌ها با موفقیت دریافت شد",
            "error": False,
            "status": 200
        }, status=status.HTTP_200_OK)
    
class CreateMailView(generics.CreateAPIView):
    serializer_class = sz.CreateMailSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
    