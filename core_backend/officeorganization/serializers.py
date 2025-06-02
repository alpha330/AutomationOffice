from rest_framework import serializers
from officeorganization import models as md

class CompanyModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Company
        fields=["id","name","national_id","economic_code","establishment_date","logo","letterhead_a4","letterhead_sh5"]
        
class PriorityModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Priority
        fields=["id","level"]
        
class DepartmentTypeModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.DepartmentType
        fields=["id","title"]
        
class DepartmentModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Department
        fields=["id","department_type","company","priority"]
        
class PositionTypeModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.PositionType
        fields=["id","title"]
        
class ProfilePositionModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.ProfilePosition
        fields=["id","profile","department_position","assigned_date","is_active"]
        
class DepartmentPositionModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.DepartmentPosition
        fields=["id","department","position_type","priority","is_active"]
        
class CompanyLocationModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.CompanyLocation
        fields=["id","name","country","province","city","postal_code","location_type","members","fax_number","phone_number"]