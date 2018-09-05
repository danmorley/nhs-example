# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-05-12 13:11
from __future__ import unicode_literals

from django.db import migrations
import pages.blocks
import shelves.blocks
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0055_auto_20180512_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.core.fields.StreamField((('page_heading_shelf', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('background_image', shelves.blocks.BlobImageChooserBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False))), icon='title')), ('simple_page_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False))), icon='title')), ('section_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False))), classname='full title', icon='title')), ('carousel_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('items', wagtail.core.blocks.StreamBlock((('video_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='repeat')), ('panel_carousel_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('items', wagtail.core.blocks.StreamBlock((('video_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='repeat')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('grid_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('rows_to_show', wagtail.core.blocks.IntegerBlock(default=0)), ('items', wagtail.core.blocks.StreamBlock((('oneyou1_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('image_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('information_panel', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta'))), icon='image', target_model='shelves.AppTeaser'))), icon='arrow-left', label='Items')), ('meta_layout', wagtail.core.blocks.ChoiceBlock(choices=[('full_width', 'Full Width'), ('2_col_1_on_mobile', 'Responsive (2 columns on desktop)'), ('3_col_1_on_mobile', 'Responsive (3 columns on desktop)')], help_text='Use this to select number of columns on desktop (only one column on mobile)', label='Layout')), ('meta_image_display', wagtail.core.blocks.ChoiceBlock(choices=[('contain', 'Contain'), ('cover', 'Stretch')], label='Teaser Image Display')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='form')), ('find_out_more_dropdown', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='order-down', label='Link dropdown')), ('iframe_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('src', wagtail.core.blocks.CharBlock(label='Source URl', required=True)), ('frame_border', wagtail.core.blocks.IntegerBlock(default=0, required=False)), ('scrolling', wagtail.core.blocks.CharBlock(required=False)), ('width', wagtail.core.blocks.IntegerBlock(default=100, required=False)), ('height', wagtail.core.blocks.IntegerBlock(default=100, required=False)), ('sandbox', wagtail.core.blocks.CharBlock(required=False)), ('shelf_id', wagtail.core.blocks.CharBlock(label='ID', required=False))), icon='code', label='IFrame')), ('divider', wagtail.core.blocks.StructBlock((('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)),), icon='code', label='Divider')))),
        ),
    ]
