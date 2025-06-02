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
        
        
class PriotityViewSet(viewsets.ModelViewSet):
    queryset = md.Priority.objects.all()
    serializer_class = sz.PriorityModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.Priority.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به تعریف اولویتهاست است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به اولویتهاست شرکت است")
        serializer.save()
        
class DepartmentTypeViewSet(viewsets.ModelViewSet):
    queryset = md.DepartmentType.objects.all()
    serializer_class = sz.DepartmentTypeModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.DepartmentType.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به تعریف واحد سازمانی است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به واحد سازمانی شرکت است")
        serializer.save()
        
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = md.Department.objects.all()
    serializer_class = sz.DepartmentModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.Department.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به تعریف اولویتهاست است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به اولویتهاست شرکت است")
        serializer.save()

class PositionTypeViewSet(viewsets.ModelViewSet):
    queryset = md.PositionType.objects.all()
    serializer_class = sz.PositionTypeModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.PositionType.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به تعریف سمت سازمانیست است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به  تعریف واحد سمت سازمانیست است")
        serializer.save()
        
class ProfilePositionViewSet(viewsets.ModelViewSet):
    queryset = md.ProfilePosition.objects.all()
    serializer_class = sz.ProfilePositionModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.ProfilePosition.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به انتصاب سمت سازمانی به کاربر است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به انتصاب واحد سمت سازمانی به کاربر است")
        serializer.save()
        
class DepartmentPositionViewSet(viewsets.ModelViewSet):
    queryset = md.DepartmentPosition.objects.all()
    serializer_class = sz.DepartmentPositionModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.DepartmentPosition.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به انتصاب سمت سازمانی به کاربر است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به انتصاب واحد سمت سازمانی به کاربر است")
        serializer.save()
        
        
class CompanyLocationViewSet(viewsets.ModelViewSet):
    queryset = md.CompanyLocation.objects.all()
    serializer_class = sz.CompanyLocationModelSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return md.CompanyLocation.objects.all()
        raise PermissionError("فقط کاربر ادمین قادر به انتصاب موقعیت جغرافیای به شرکت است")

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionError("فقط کاربر ادمین قادر به انتصاب موقعیت جغرافیایی به شرکت است")
        serializer.save()