from django.core.exceptions import ValidationError
import re


def validate_iranian_cellphone_number(value):
    pattern = r"^09\d{9}$"
    if not re.match(pattern, value):
        return False
    else:
        return True
    
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w{2,}$'
    if not re.match(pattern,email):
        return False
    else:
        return True