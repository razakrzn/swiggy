# Generated by Django 4.2.16 on 2025-01-18 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("orders", "0008_order_order_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="is_deleted",
            field=models.BooleanField(default=False),
        ),
    ]
