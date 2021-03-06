# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-08-23 08:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0040_page_draft_title'),
        ('shelves', '0020_appteaser_cta_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='appteaser',
            name='cta_page',
            field=modelcluster.fields.ParentalKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='app_teaser_links', to='wagtailcore.Page'),
        ),
        migrations.AddField(
            model_name='appteaser',
            name='cta_text',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
