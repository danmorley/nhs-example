# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-04-20 15:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0052_auto_20180417_1109'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='og_url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='oneyou2page',
            name='twitter_url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
