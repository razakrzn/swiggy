# Generated by Django 4.2.16 on 2024-12-12 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('customer', 'Customer'), ('restaurant_owner', 'Restaurant Owner')], default='customer', max_length=20),
        ),
    ]