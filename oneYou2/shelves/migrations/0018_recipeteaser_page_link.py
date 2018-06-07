# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-06-01 12:38
from __future__ import unicode_literals

from django.db import migrations
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0040_page_draft_title'),
        ('shelves', '0017_recipeteaser'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipeteaser',
            name='page_link',
            field=modelcluster.fields.ParentalKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='recipe_teaser_links', to='wagtailcore.Page'),
        ),
    ]