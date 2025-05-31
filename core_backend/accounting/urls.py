from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'profiles', views.ProfileViewSet, basename='profile')
router.register(r'TempCodes', views.TempAuthenticatingViewSet, basename='TempCode')
router.register(r'UseLoginDevices', views.UserLoginDeviceViewSet, basename='UserLoginDevice')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('tempcode/verify/', views.ActivationApiCodeView.as_view(), name='tempcode_verify'),
    path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/<str:token>/', views.ResetPasswordView.as_view(), name='reset_password'),
    path('my-profile/', views.MyProfileView.as_view(), name='my-profile'),
    path('my-profile/update/<int:id>/', views.MyProfileUpdate.as_view(), name='my-profile-update'),
]