# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-06-11 14:56
from __future__ import unicode_literals

from django.db import migrations
import pages.blocks
import shelves.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0062_auto_20180601_1338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('background_image', shelves.blocks.BlobImageChooserBlock(required=False)), ('meta_gradient', wagtail.wagtailcore.blocks.BooleanBlock(default=False, label='Green gradient', required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False))), icon='title')), ('simple_page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False))), icon='title')), ('section_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False))), classname='full title', icon='title')), ('carousel_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='repeat')), ('panel_carousel_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='repeat')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('grid_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('rows_to_show', wagtail.wagtailcore.blocks.IntegerBlock(default=0)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('oneyou1_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('information_panel', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta'))), icon='image', target_model='shelves.AppTeaser')), ('icon_card_panel', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('panel_id', pages.blocks.IDBlock(label='ID', required=False)), ('meta_layout', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('icon_on_left', 'Icon on Left'), ('icon_on_right', 'Icon on Right'), ('icon_heading_left', 'Icon Heading Left'), ('icon_body_right', 'Icon Body Right')], label='Layout')), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('standard_grey_bg', 'Standard on Grey Background'), ('standard_heading_standard_body_grey_bg', 'Standard Heading, Standard Body Text, Grey Background'), ('large_green_heading_standard_body_grey_bg', 'Large Green Heading, Standard Body Text, Grey Background'), ('x_small_heading_large_body_no_bg', 'X Small Heading, Large Body Text, No Background')], label='Variant'))), icon='snippet'))), icon='arrow-left', label='Items')), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('standard', 'Standard'), ('grey_background', 'Grey Background')], label='Variant')), ('meta_layout', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('full_width', 'Full Width'), ('2_col_1_on_mobile', 'Responsive (2 columns on desktop)'), ('3_col_1_on_mobile', 'Responsive (3 columns on desktop)')], help_text='Use this to select number of columns on desktop (only one column on mobile)', label='Layout')), ('meta_image_display', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('contain', 'Contain'), ('cover', 'Stretch')], label='Teaser Image Display')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='form')), ('recipe_grid_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('rows_to_show', wagtail.wagtailcore.blocks.IntegerBlock(default=0)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('recipe_teaser', shelves.blocks.RecipeTeaserChooserBlock(icon='image', target_model='shelves.RecipeTeaser')),), icon='arrow-left', label='Items')), ('meta_image_display', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('contain', 'Contain'), ('cover', 'Stretch')], label='Teaser Image Display')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='form')), ('find_out_more_dropdown', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='order-down', label='Link dropdown')), ('iframe_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('src', wagtail.wagtailcore.blocks.CharBlock(label='Source URl', required=True)), ('frame_border', wagtail.wagtailcore.blocks.IntegerBlock(default=0, required=False)), ('scrolling', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('width', wagtail.wagtailcore.blocks.IntegerBlock(default=100, required=False)), ('height', wagtail.wagtailcore.blocks.IntegerBlock(default=100, required=False)), ('sandbox', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='placeholder', label='IFrame')), ('divider', wagtail.wagtailcore.blocks.StructBlock((('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)),), icon='horizontalrule', label='Divider')), ('article_page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('display_back_button', wagtail.wagtailcore.blocks.BooleanBlock(default=True, label='Display a back button', required=False)), ('back_button_label', wagtail.wagtailcore.blocks.CharBlock(required=False))), icon='title', label='Article Page Heading')), ('table', wagtail.wagtailcore.blocks.StructBlock((('header', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.CharBlock(required=False), label='Column headings')), ('display_header', wagtail.wagtailcore.blocks.BooleanBlock(label='Display the table header?', required=False)), ('body_rows', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StreamBlock((('simple_text_panel', wagtail.wagtailcore.blocks.StructBlock((('text', wagtail.wagtailcore.blocks.CharBlock(required=False)),), required=False)), ('rich_text_panel', wagtail.wagtailcore.blocks.StructBlock((('text', wagtail.wagtailcore.blocks.RichTextBlock(required=False)),), required=False)), ('icon_card_panel', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('panel_id', pages.blocks.IDBlock(label='ID', required=False)), ('meta_layout', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('icon_on_left', 'Icon on Left'), ('icon_on_right', 'Icon on Right'), ('icon_heading_left', 'Icon Heading Left'), ('icon_body_right', 'Icon Body Right')], label='Layout')), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('standard_grey_bg', 'Standard on Grey Background'), ('standard_heading_standard_body_grey_bg', 'Standard Heading, Standard Body Text, Grey Background'), ('large_green_heading_standard_body_grey_bg', 'Large Green Heading, Standard Body Text, Grey Background'), ('x_small_heading_large_body_no_bg', 'X Small Heading, Large Body Text, No Background')], label='Variant'))), icon='snippet', required=False)))))), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False)), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('standard', 'Standard')], label='Variant'))), icon='list-ul', label='Table'))), blank=True, null=True),
        ),
    ]
