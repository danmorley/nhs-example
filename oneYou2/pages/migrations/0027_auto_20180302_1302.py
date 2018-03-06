# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-02 13:02
from __future__ import unicode_literals

from django.db import migrations
import shelves.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0026_auto_20180228_1355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('body', wagtail.wagtailcore.blocks.TextBlock(required=True)), ('background_image', shelves.blocks.BlobImageChooserBlock()), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(help_text='Not displayed in the front end', label='ID', required=False))), icon='title')), ('simple_page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(help_text='Not displayed in the front end', label='ID', required=False))), icon='title')), ('section_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(help_text='Not displayed in the front end', label='ID', required=False))), classname='full title', icon='title')), ('carousel_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock()), ('items', wagtail.wagtailcore.blocks.StreamBlock((('oneyou1_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('body', wagtail.wagtailcore.blocks.TextBlock(required=True)), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock()), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('body', wagtail.wagtailcore.blocks.TextBlock(required=True)), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='media')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_shelf', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser'))), icon='arrow-left', label='Items')), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='repeat')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_shelf', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('grid_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock()), ('rows_to_show', wagtail.wagtailcore.blocks.IntegerBlock(default=0)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('oneyou1_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('body', wagtail.wagtailcore.blocks.TextBlock(required=True)), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock()), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('body', wagtail.wagtailcore.blocks.TextBlock(required=True)), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='media'))), icon='arrow-left', label='Items')), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='form')), ('oneyou1_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('body', wagtail.wagtailcore.blocks.TextBlock(required=True)), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock()), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('body', wagtail.wagtailcore.blocks.TextBlock(required=True)), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='media')), ('find_out_more_dropdown', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items')), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='order-down', label='Link dropdown')))),
        ),
    ]
