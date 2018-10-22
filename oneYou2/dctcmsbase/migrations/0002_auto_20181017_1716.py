# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-10-17 16:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dctcmsbase', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bannerpanel',
            name='meta_gradient',
        ),
        migrations.AddField(
            model_name='bannerpanel',
            name='background_image_desktop_rendition',
            field=models.CharField(choices=[('1440x309', '1440x309')], default='1440x309', max_length=20),
        ),
        migrations.AddField(
            model_name='bannerpanel',
            name='background_image_mobile_rendition',
            field=models.CharField(choices=[('375x256', '375 x 256')], default='375x256', max_length=20),
        ),
        migrations.AddField(
            model_name='bannerpanel',
            name='meta_variant',
            field=models.CharField(choices=[('none', 'None'), ('gradient', 'Background Gradient')], default='none', max_length=20),
        ),
    ]