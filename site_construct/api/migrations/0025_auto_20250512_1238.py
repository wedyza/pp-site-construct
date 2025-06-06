# Generated by Django 3.2 on 2025-05-12 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0024_remove_paymentmethod_bank_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="itemmedia",
            name="source",
            field=models.ImageField(
                default=None, upload_to="media ", verbose_name="Картинка"
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="market",
            name="avatar",
            field=models.ImageField(
                null=True, upload_to="markets", verbose_name="Аватар"
            ),
        ),
    ]
