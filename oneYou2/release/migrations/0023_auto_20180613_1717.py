# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-06-13 16:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0022_auto_20180610_1900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(default='35df715e-a649-4117-bd89-38b6eeb3f6d3', max_length=255),
        ),
    ]
