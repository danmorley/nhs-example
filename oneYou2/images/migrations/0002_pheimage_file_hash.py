# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-08-13 10:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pheimage',
            name='file_hash',
            field=models.CharField(blank=True, editable=False, max_length=40),
        ),
    ]
