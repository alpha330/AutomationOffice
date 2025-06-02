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