from django.urls import path, include
from rest_framework.routers import DefaultRouter
from officeorganization import views as vw

router = DefaultRouter()
router.register(r'Company', vw.CompanyViewSet, basename='company')
router.register(r'Priority', vw.PriotityViewSet, basename='priority')
router.register(r'DepartmentType', vw.DepartmentTypeViewSet, basename='department-type')
router.register(r'Department', vw.DepartmentViewSet, basename='department')
router.register(r'PositionType', vw.PositionTypeViewSet, basename='position-type')
router.register(r'ProfilePosition', vw.ProfilePositionViewSet, basename='profile-position')
router.register(r'DepartmentPosition', vw.DepartmentPositionViewSet, basename='department-position')
router.register(r'CompanyLocation', vw.CompanyLocationViewSet, basename='company-location')

urlpatterns = [
    path('', include(router.urls)),
]