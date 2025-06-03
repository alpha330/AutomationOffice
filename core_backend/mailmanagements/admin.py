from django.contrib import admin
from mailmanagements import models as md

# Register your models here.

@admin.register(md.Office)
class OfficeModelAdmin(admin.ModelAdmin):
    list_display = ("name","address","department","department","created_at","updated_at")
    search_fields = ("name","address","department","department")
    
@admin.register(md.Secretariat)
class SecretariatModelAdmin(admin.ModelAdmin):
    list_display = ("name","department","office","created_at","updated_at")
    search_fields = ("name","department","office")
    
@admin.register(md.MailCategory)
class MailCategoryModelAdmin(admin.ModelAdmin):
    list_display = ("name","is_incoming","created_at","updated_at")
    search_fields = ("name",)
    
@admin.register(md.Mail)
class MailModelAdmin(admin.ModelAdmin):
    list_display = ("secretariat","category","company","header_size","is_signed","sender","mail_number","created_at","updated_at", "is_draft", "is_confidential", "is_urgent","notify_by_sms","notify_by_email")
    list_filter = ("secretariat","category","company","header_size","is_signed","sender","is_draft", "is_confidential", "is_urgent","notify_by_sms","notify_by_email")
    list_editable = ("is_signed","is_draft", "is_confidential", "is_urgent","notify_by_sms","notify_by_email")
    ordering = ("-created_at",)
    
    search_fields = ("name","address","department","department")
    