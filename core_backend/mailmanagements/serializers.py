from rest_framework import serializers
from mailmanagements import models as md

class OfficeModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Office
        fields=["id","name","address", "department", "created_at" ,"updated_at"]
        
        
class SecretariatModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Secretariat
        fields=["id","name","department" ,"office", "members","created_at", "updated_at"]
        
class MailCategoryModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.MailCategory
        fields=["id","name","is_incoming" ,"is_outgoing", "description", "created_at", "updated_at"]
        
class MailModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=md.Mail
        fields=["id","secretariat" ,"category", "company" ,"header_size", "subject" ,"content" ,"sender", "recipients", "mail_number", "signature_image", "is_signed" ,"created_at", "updated_at" ,"is_draft"]