# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-05-09 12:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0011_auto_20180319_1404'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(default='cfc15799-4781-4ef9-98a4-1f2059e10611', max_length=255),
        ),
    ]