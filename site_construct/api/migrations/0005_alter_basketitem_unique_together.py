# Generated by Django 3.2 on 2025-04-01 07:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_basket_visible"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="basketitem",
            unique_together={("good_item", "basket")},
        ),
    ]
