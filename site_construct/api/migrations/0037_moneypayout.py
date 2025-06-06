# Generated by Django 3.2 on 2025-05-24 12:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("api", "0036_transaction_checkout_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="MoneyPayout",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.FloatField(verbose_name="Сумма")),
                (
                    "state",
                    models.TextField(
                        choices=[
                            ("REFUND", "Возврат"),
                            ("PAYOUT", "Выплата"),
                            ("FREEZED", "Заморожен"),
                        ],
                        default="Заморожен",
                        verbose_name="Статус",
                    ),
                ),
                (
                    "user_from",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sender",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="От кого",
                    ),
                ),
                (
                    "user_to",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="receiver",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Кому",
                    ),
                ),
            ],
        ),
    ]
