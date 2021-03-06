# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-26 11:25
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0040_page_draft_title'),
        ('shelves', '0006_auto_20180226_1106'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bannershelf',
            old_name='button_text',
            new_name='cta_text',
        ),
        migrations.RemoveField(
            model_name='bannershelf',
            name='button_link',
        ),
        migrations.AddField(
            model_name='bannershelf',
            name='cta_link',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='bannershelf',
            name='cta_page',
            field=modelcluster.fields.ParentalKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='related_links', to='wagtailcore.Page'),
        ),
    ]
