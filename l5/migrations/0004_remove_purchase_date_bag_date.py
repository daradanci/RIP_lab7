# Generated by Django 4.1.2 on 2022-11-02 19:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('l5', '0003_alter_bag_idclient'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchase',
            name='date',
        ),
        migrations.AddField(
            model_name='bag',
            name='date',
            field=models.DateField(default=datetime.date.today, verbose_name='Date'),
        ),
    ]