# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-09-14 11:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shelves', '0026_auto_20180913_1149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appteaser',
            name='cta_appstore',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='appteaser',
            name='cta_googleplay',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='appteaser',
            name='cta_link',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]
