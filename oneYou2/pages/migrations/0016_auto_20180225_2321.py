# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-25 23:21
from __future__ import unicode_literals

from django.db import migrations
import shelves.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0015_auto_20180216_1916'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock()), ('promoshelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('bannershelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('appteaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')))),
        ),
    ]
