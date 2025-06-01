from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from rest_framework import viewsets, generics, status
from officeorganization import models as md
from officeorganization import serializers as sz

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = md.Company.objects.all()
    serializer_class = sz.CompanyModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.Company.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به تعریف شرکت است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به تعریف شرکت است")
        serializer.save()
