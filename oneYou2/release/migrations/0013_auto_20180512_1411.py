# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-05-12 13:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0012_auto_20180512_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(default='fd70f4ca-184f-4940-a366-96f094f4e452', max_length=255),
        ),
    ]
