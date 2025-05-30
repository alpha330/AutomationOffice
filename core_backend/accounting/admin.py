from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile, User,TempCodeAuthenticating,UserLoginDevice
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
import jdatetime

# ADMIN TO PERFORM MANAGE MODELS IN ACCOUNTING APP

User = get_user_model()

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("id", "email", "is_superuser", "is_active", "is_verified")
    list_filter = ("email", "is_superuser", "is_active", "is_verified")
    search_fields = ("email",)
    ordering = ("email",)
    fieldsets = (
        ("Authentication", {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "is_verified")}),
        ("Group Permissions", {"fields": ("groups", "user_permissions", "type")}),
        ("Important Dates", {"fields": ("last_login", "created_date_display", "updated_date_display")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "is_verified",
                    "type",
                ),
            },
        ),
    )
    readonly_fields = ("created_date_display", "updated_date_display")  # تغییر به متدهای نمایش

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if not request.user.is_superuser:
            return qs.filter(id=request.user.id)
        return qs

    def created_date_display(self, obj):
        return jdatetime.datetime.fromgregorian(datetime=obj.created_date).strftime('%Y/%m/%d %H:%M:%S')
    created_date_display.short_description = "تاریخ ایجاد (شمسی)"

    def updated_date_display(self, obj):
        return jdatetime.datetime.fromgregorian(datetime=obj.updated_date).strftime('%Y/%m/%d %H:%M:%S')
    updated_date_display.short_description = "تاریخ به‌روزرسانی (شمسی)"

@admin.register(Profile)
class CustomProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "first_name", "last_name", "phone_number")
    search_fields = ("user__email", "first_name", "last_name", "phone_number")

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ["session_key", "expire_date"]
    readonly_fields = ["session_key", "expire_date"]

    def has_add_permission(self, request):
        return False

@admin.register(TempCodeAuthenticating)
class AdminModelTempCodeAuthenticating(admin.ModelAdmin):

    list_display = [
        "id",
        "user",
        "code",
        "created_date",
        "updated_date",
        "expire_time",
    ]

    ordering = [
        "id",
        "user",
        "code",
        "created_date",
        "updated_date",
        "expire_time",
    ]

@admin.register(UserLoginDevice)
class AdminModelUserLoginDevice(admin.ModelAdmin):

    list_display = [
        "id",
        "user",
        "ip_address",
        "browser",
        "device",
        "created_at",
    ]

    ordering = [
        "id",
        "user",
        "ip_address",
        "browser",
        "device",
        "created_at",
    ]

