# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-14 13:58
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0013_theme'),
    ]

    operations = [
        migrations.AddField(
            model_name='oneyou2page',
            name='theme',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pages', to='pages.Theme'),
        ),
    ]
