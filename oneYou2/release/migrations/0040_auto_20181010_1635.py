# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-10-10 15:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0039_auto_20181010_1418'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(choices=[('local', 'local')], default='local', max_length=255),
        ),
    ]
