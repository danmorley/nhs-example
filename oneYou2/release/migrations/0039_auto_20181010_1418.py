# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-10-10 13:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0038_auto_20180927_1108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(default='6f14f895-7810-4b23-bf91-4a6c0925594f', max_length=255),
        ),
    ]
