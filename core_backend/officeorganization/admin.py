from django.contrib import admin
from .models import Company,Priority,DepartmentType,Department,PositionType,DepartmentPosition,ProfilePosition,CompanyLocation
# Register your models here.

@admin.register(Company)
class CompanyModelAdmin(admin.ModelAdmin):
    list_display =("name","national_id","economic_code","establishment_date")
    search_fields = ("name", "national_id", "economic_code", "establishment_date")
    
@admin.register(Priority)
class PriorityModelAdmin(admin.ModelAdmin):
    list_display =("level",)
    
@admin.register(DepartmentType)
class DepartmentTypeModelAdmin(admin.ModelAdmin):
    list_display =("title",)
    
@admin.register(PositionType)
class PositionTypeModelAdmin(admin.ModelAdmin):
    list_display =("title",)
    
@admin.register(DepartmentPosition)
class DepartmentPositionModelAdmin(admin.ModelAdmin):
    list_display =("department","position_type","priority","is_active")
    
@admin.register(Department)
class DepartmentModelAdmin(admin.ModelAdmin):
    list_display =("department_type","company","priority")
    
@admin.register(ProfilePosition)
class ProfilePositionModelAdmin(admin.ModelAdmin):
    list_display =("profile","department_position","assigned_date","is_active")
    
@admin.register(CompanyLocation)
class CompanyLocationModelAdmin(admin.ModelAdmin):
    list_display =("name","country","province","city","postal_code","location_type")