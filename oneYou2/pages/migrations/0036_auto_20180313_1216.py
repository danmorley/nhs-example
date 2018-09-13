# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-13 12:16
from __future__ import unicode_literals

from django.db import migrations
import shelves.blocks
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0035_auto_20180312_1006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.core.fields.StreamField((('page_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('body', wagtail.core.blocks.RichTextBlock(required=True)), ('background_image', shelves.blocks.BlobImageChooserBlock()), ('shelf_id', wagtail.core.blocks.CharBlock(help_text='Not displayed in the front end', label='ID', required=False))), icon='title')), ('simple_page_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('shelf_id', wagtail.core.blocks.CharBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False))), icon='title')), ('section_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('shelf_id', wagtail.core.blocks.CharBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False))), classname='full title', icon='title')), ('carousel_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock()), ('items', wagtail.core.blocks.StreamBlock((('oneyou1_teaser', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('body', wagtail.core.blocks.RichTextBlock(required=True)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=True)), ('link_external', wagtail.core.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.core.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('body', wagtail.core.blocks.RichTextBlock(required=True)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=True)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=True)), ('link_external', wagtail.core.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.core.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='media')), ('image_teaser', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('body', wagtail.core.blocks.RichTextBlock(required=True)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=True)), ('link_external', wagtail.core.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.core.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser'))), icon='arrow-left', label='Items')), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='repeat')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('grid_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock()), ('rows_to_show', wagtail.core.blocks.IntegerBlock(default=0)), ('items', wagtail.core.blocks.StreamBlock((('oneyou1_teaser', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('body', wagtail.core.blocks.RichTextBlock(required=True)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=True)), ('link_external', wagtail.core.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.core.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('body', wagtail.core.blocks.RichTextBlock(required=True)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=True)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=True)), ('link_external', wagtail.core.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.core.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='media')), ('image_teaser', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('body', wagtail.core.blocks.RichTextBlock(required=True)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=True)), ('link_external', wagtail.core.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.core.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser'))), icon='arrow-left', label='Items')), ('meta_layout', wagtail.core.blocks.ChoiceBlock(choices=[('full_width', 'Full Width'), ('2_col_1_on_mobile', 'Responsive (1 column on mobile, 2 on desktop)')], label='Layout')), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='form')), ('find_out_more_dropdown', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=True)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=True)), ('link_external', wagtail.core.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.core.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items')), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='order-down', label='Link dropdown')))),
        ),
    ]
