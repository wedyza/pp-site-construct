# Generated by Django 3.2 on 2025-01-03 08:13

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0011_auto_20250103_1124"),
    ]

    operations = [
        migrations.AlterField(
            model_name="moderatorsetuped",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(2025, 1, 3, 8, 13, 25, 378921, tzinfo=utc)
            ),
        ),
    ]
