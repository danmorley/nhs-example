# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-06-14 08:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0023_auto_20180613_1717'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(default='aa7a3df1-b57d-4e0d-9664-61f4c26f5231', max_length=255),
        ),
    ]
