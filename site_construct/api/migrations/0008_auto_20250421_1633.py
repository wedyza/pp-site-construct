# Generated by Django 3.2 on 2025-04-21 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_auto_20250421_1359"),
    ]

    operations = [
        migrations.AddField(
            model_name="gooditem",
            name="apply",
            field=models.BooleanField(default=False, verbose_name="Одобрено"),
        ),
        migrations.AddField(
            model_name="gooditem",
            name="visible",
            field=models.BooleanField(default=False, verbose_name="Видимость"),
        ),
    ]
