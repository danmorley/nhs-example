# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-10-18 11:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dctcmsbase', '0002_auto_20181017_1716'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BannerPanel',
            new_name='Banner',
        ),
    ]
