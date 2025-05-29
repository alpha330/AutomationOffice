from celery import shared_task
from mail_templated import EmailMessage
import ghasedakpack
from .models import TempCodeAuthenticating
from datetime import datetime

@shared_task
def sendEmail(template, context, from_email, recipient_list):
    task_email = EmailMessage(
        template,
        context,
        from_email,
        recipient_list,
    )
    return task_email.send()

@shared_task
def sendSms(message, receptor):
    message = message
    receptor = receptor
    linenumber = "5000270"
    sms = ghasedakpack.Ghasedak("89b6872e093fe8f10d599a087fbfaac272c05d0cfa36ce315aefd909b2616d9a")
    return sms.send({'message': message, 'receptor': receptor, 'linenumber': linenumber})

@shared_task
def delete_expired_codes():
    try:
       now = datetime.now()
       # رکوردهایی که زمان انقضای آن‌ها گذشته است را حذف کن
       TempCodeAuthenticating.objects.filter(expire_time__lt=now).delete()
       print(f"Delete Expired Codes Success")
    except Exception as e:
       print(f"Error During Delete Expire Codes Due To : {e}")