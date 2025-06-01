from django.urls import path, include
from rest_framework.routers import DefaultRouter
from officeorganization import views as vw

router = DefaultRouter()
router.register(r'Company', vw.CompanyViewSet, basename='company')

urlpatterns = [
    path('', include(router.urls)),
]