# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-07-26 08:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0029_auto_20180705_1257'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(default='3491fd5c-e483-43b5-9d7f-9f48b2835f8a', max_length=255),
        ),
    ]
