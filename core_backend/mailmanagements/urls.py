from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mailmanagements import views as vw

router = DefaultRouter()
router.register(r'Office', vw.OfficeViewSet, basename='office')
router.register(r'Secretariat', vw.SecretariatViewSet, basename='secretariat')
router.register(r'MailCategory', vw.MailCategoryViewSet, basename='mail-category')
router.register(r'Mail', vw.MailViewSet, basename='mail')

urlpatterns = [
    path('', include(router.urls)),
    path('MailInbox/', vw.CheckMailRecipientView.as_view(), name='mail-inbox'),
    path('MailOutBox/', vw.CheckMailSendView.as_view(), name='mail-outbox'),
    path('CreateMail/', vw.CreateMailView.as_view(), name='create-mail'),
]