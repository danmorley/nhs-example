# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-05-30 13:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0060_auto_20180530_1157'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='oneyou2page',
            name='page_ref',
        ),
    ]
