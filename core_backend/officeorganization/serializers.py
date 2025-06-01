from rest_framework import serializers
from officeorganization import models as md

class CompanyModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Company
        fields=["id","name","national_id","economic_code","establishment_date","logo","letterhead_a4","letterhead_sh5"]