from celery import shared_task
import httpx

BASE_NOTIFICATION_URL = "http://notifications_microservice:8000/api/v1/notifications/"

@shared_task
def create_notification(notification_data):
    response = httpx.post(BASE_NOTIFICATION_URL, json=notification_data) #pragma: no cover