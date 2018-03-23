# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-23 12:01
from __future__ import unicode_literals

from django.db import migrations
import pages.blocks
import shelves.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0043_auto_20180322_1026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('background_image', shelves.blocks.BlobImageChooserBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False))), icon='title')), ('simple_page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False))), icon='title')), ('section_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False))), classname='full title', icon='title')), ('carousel_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='repeat')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('grid_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('rows_to_show', wagtail.wagtailcore.blocks.IntegerBlock(default=0)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('oneyou1_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('information_panel', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='image', target_model='shelves.AppTeaser'))), icon='arrow-left', label='Items')), ('meta_layout', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('full_width', 'Full Width'), ('2_col_1_on_mobile', 'Responsive (1 column on mobile, 2 on desktop)')], label='Layout')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='form')), ('find_out_more_dropdown', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.URLBlock(label='External link', required=False)), ('link_page', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))))),), icon='arrow-left', label='Items')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='order-down', label='Link dropdown')))),
        ),
    ]
