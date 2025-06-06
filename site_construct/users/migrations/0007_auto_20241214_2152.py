# Generated by Django 3.2 on 2024-12-14 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_alter_customabstractuser_rating"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customabstractuser",
            name="avatar",
            field=models.ImageField(null=True, upload_to=""),
        ),
        migrations.AlterField(
            model_name="customabstractuser",
            name="given_name",
            field=models.CharField(max_length=40, null=True, verbose_name="Отчество"),
        ),
    ]
