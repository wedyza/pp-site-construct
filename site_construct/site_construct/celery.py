import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'site_construct.settings')

app = Celery('site_construct')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()