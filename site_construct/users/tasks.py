from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task

@shared_task
def send_otp_email(email, otp):
    subject = "Your OTP for Login"
    message = f"Your OTP is: {otp}"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)
