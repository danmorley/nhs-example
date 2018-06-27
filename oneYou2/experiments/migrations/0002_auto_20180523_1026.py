# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-05-23 09:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experiments', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='experiment',
            name='control_page',
        ),
        migrations.AddField(
            model_name='experiment',
            name='manytomany',
            field=models.ManyToManyField(blank=True, to='experiments.OneYouVariant'),
        ),
    ]