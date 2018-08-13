# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-06-18 15:47
from __future__ import unicode_literals

from django.db import migrations
import pages.blocks
import shelves.blocks
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0064_auto_20180612_2236'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.core.fields.StreamField((('page_heading_shelf', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('background_image', shelves.blocks.BlobImageChooserBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', help_text='Not displayed in the front end', label='ID', required=False)), ('meta_gradient', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=False, label='Green gradient', required=False))), icon='title')), ('simple_page_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False))), icon='title')), ('section_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False))), classname='full title', icon='title')), ('carousel_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('items', wagtail.core.blocks.StreamBlock((('video_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='media')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], classname='dct-meta-field', label='Variant'))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='repeat')), ('panel_carousel_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('items', wagtail.core.blocks.StreamBlock((('video_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='media')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], classname='dct-meta-field', label='Variant'))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='repeat')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('grid_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('items', wagtail.core.blocks.StreamBlock((('oneyou1_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='media')), ('image_teaser', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], classname='dct-meta-field', label='Variant'))), icon='pick', label='Inspiration teaser')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('information_panel', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='image', target_model='shelves.AppTeaser')), ('icon_card_panel', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('panel_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('standard_grey_bg', 'Standard on Grey Background'), ('standard_heading_standard_body_grey_bg', 'Standard Heading, Standard Body Text, Grey Background'), ('large_green_heading_standard_body_grey_bg', 'Large Green Heading, Standard Body Text, Grey Background'), ('x_small_heading_large_body_no_bg', 'X Small Heading, Large Body Text, No Background')], classname='dct-meta-field', label='Variant')), ('meta_layout', wagtail.core.blocks.ChoiceBlock(choices=[('icon_on_left', 'Icon on Left'), ('icon_on_right', 'Icon on Right'), ('icon_heading_left', 'Icon Heading Left'), ('icon_body_right', 'Icon Body Right')], classname='dct-meta-field', label='Layout'))), icon='snippet')), ('inline_script_panel', wagtail.core.blocks.StructBlock((('script', wagtail.core.blocks.TextBlock(help_text='The javascript to be inserted', required=False)), ('src', wagtail.core.blocks.CharBlock(help_text='URL of the javascript file', required=False)), ('field_id', pages.blocks.IDBlock(label='Placeholder ID', required=False, retain_case=True))), icon='code'))), icon='arrow-left', label='Items')), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('rows_to_show', wagtail.core.blocks.IntegerBlock(classname='dct-meta-field', default=0)), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('standard', 'Standard'), ('grey_background', 'Grey Background')], classname='dct-meta-field', label='Variant')), ('meta_layout', wagtail.core.blocks.ChoiceBlock(choices=[('full_width', 'Full Width'), ('2_col_1_on_mobile', 'Responsive (2 columns on desktop)'), ('3_col_1_on_mobile', 'Responsive (3 columns on desktop)')], classname='dct-meta-field', help_text='Use this to select number of columns on desktop (only one column on mobile)', label='Layout')), ('meta_image_display', wagtail.core.blocks.ChoiceBlock(choices=[('contain', 'Contain'), ('cover', 'Stretch')], classname='dct-meta-field', label='Teaser Image Display'))), icon='form')), ('recipe_grid_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('items', wagtail.core.blocks.StreamBlock((('recipe_teaser', shelves.blocks.RecipeTeaserChooserBlock(icon='image', target_model='shelves.RecipeTeaser')),), icon='arrow-left', label='Items')), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('rows_to_show', wagtail.core.blocks.IntegerBlock(classname='dct-meta-field', default=0)), ('meta_image_display', wagtail.core.blocks.ChoiceBlock(choices=[('contain', 'Contain'), ('cover', 'Stretch')], classname='dct-meta-field', label='Teaser Image Display'))), icon='form')), ('find_out_more_dropdown', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('cta', wagtail.core.blocks.StreamBlock((('simple_menu_item', wagtail.core.blocks.StructBlock((('link_text', wagtail.core.blocks.CharBlock(required=False)), ('link_external', wagtail.core.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items')), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False))), icon='order-down', label='Link dropdown')), ('iframe_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('src', wagtail.core.blocks.CharBlock(label='Source URl', required=True)), ('frame_border', wagtail.core.blocks.IntegerBlock(default=0, required=False)), ('scrolling', wagtail.core.blocks.CharBlock(required=False)), ('width', wagtail.core.blocks.IntegerBlock(default=100, required=False)), ('height', wagtail.core.blocks.IntegerBlock(default=100, required=False)), ('sandbox', wagtail.core.blocks.CharBlock(required=False)), ('shelf_id', wagtail.core.blocks.CharBlock(classname='dct-meta-field', label='ID', required=False))), icon='placeholder', label='IFrame')), ('divider', wagtail.core.blocks.StructBlock((('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)),), icon='horizontalrule', label='Divider')), ('article_page_heading_shelf', wagtail.core.blocks.StructBlock((('heading', wagtail.core.blocks.CharBlock(required=False)), ('display_back_button', wagtail.core.blocks.BooleanBlock(default=True, label='Display a back button', required=False)), ('back_button_label', wagtail.core.blocks.CharBlock(required=False))), icon='title', label='Article Page Heading')), ('table', wagtail.core.blocks.StructBlock((('header', wagtail.core.blocks.ListBlock(wagtail.core.blocks.CharBlock(required=False), label='Column headings')), ('display_header', wagtail.core.blocks.BooleanBlock(label='Display the table header?', required=False)), ('body_rows', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StreamBlock((('simple_text_panel', wagtail.core.blocks.StructBlock((('text', wagtail.core.blocks.CharBlock(required=False)),), required=False)), ('rich_text_panel', wagtail.core.blocks.StructBlock((('text', wagtail.core.blocks.RichTextBlock(required=False)),), required=False)), ('icon_card_panel', wagtail.core.blocks.StructBlock((('image_meta', wagtail.core.blocks.TextBlock(classname='dct-meta-field', required=False)), ('mobile_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('desktop_use_renditions', wagtail.core.blocks.BooleanBlock(classname='dct-meta-field', default=True, required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('panel_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('standard_grey_bg', 'Standard on Grey Background'), ('standard_heading_standard_body_grey_bg', 'Standard Heading, Standard Body Text, Grey Background'), ('large_green_heading_standard_body_grey_bg', 'Large Green Heading, Standard Body Text, Grey Background'), ('x_small_heading_large_body_no_bg', 'X Small Heading, Large Body Text, No Background')], classname='dct-meta-field', label='Variant')), ('meta_layout', wagtail.core.blocks.ChoiceBlock(choices=[('icon_on_left', 'Icon on Left'), ('icon_on_right', 'Icon on Right'), ('icon_heading_left', 'Icon Heading Left'), ('icon_body_right', 'Icon Body Right')], classname='dct-meta-field', label='Layout'))), icon='snippet', required=False)))))), ('shelf_id', pages.blocks.IDBlock(classname='dct-meta-field', label='ID', required=False)), ('meta_variant', wagtail.core.blocks.ChoiceBlock(choices=[('standard', 'Standard')], classname='dct-meta-field', label='Variant'))), icon='list-ul', label='Table')), ('script_shelf', wagtail.core.blocks.StructBlock((('script', wagtail.core.blocks.TextBlock(help_text='The javascript to be inserted', required=False)), ('src', wagtail.core.blocks.CharBlock(help_text='URL of the javascript file', required=False)), ('field_id', pages.blocks.IDBlock(label='Placeholder ID', required=False, retain_case=True))), icon='code', label='Script shelf'))), blank=True, null=True),
        ),
    ]
