# Generated by Django 4.2.16 on 2025-01-09 06:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("restaurants", "0007_alter_restaurant_options_delete_order"),
    ]

    operations = [
        migrations.AlterField(
            model_name="restaurant",
            name="owner_name",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
