# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-05-30 10:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import pages.blocks
import shelves.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
        ('pages', '0059_oneyou2page_use_share_button'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecipePage',
            fields=[
                ('oneyou2page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.OneYou2Page')),
                ('recipe_name', models.CharField(blank=True, max_length=255, null=True)),
                ('tags', models.CharField(blank=True, max_length=255, null=True)),
                ('serves', models.IntegerField(default=0)),
                ('preparation_time', models.IntegerField(default=0)),
                ('difficulty', models.CharField(choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')], default='medium', max_length=255)),
                ('ingredients_list', wagtail.wagtailcore.fields.RichTextField(blank=True, null=True)),
                ('instructions', wagtail.wagtailcore.fields.RichTextField(blank=True, null=True)),
                ('image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='images.PHEImage')),
            ],
            options={
                'abstract': False,
            },
            bases=('pages.oneyou2page',),
        ),
        migrations.AlterField(
            model_name='oneyou2page',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('background_image', shelves.blocks.BlobImageChooserBlock(required=False)), ('meta_gradient', wagtail.wagtailcore.blocks.BooleanBlock(default=False, label='Green gradient', required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False))), icon='title')), ('simple_page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False))), icon='title')), ('section_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False))), classname='full title', icon='title')), ('carousel_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='repeat')), ('panel_carousel_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser'))), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='repeat')), ('promo_shelf', shelves.blocks.PromoShelfChooserBlock(icon='image', target_model='shelves.PromoShelf')), ('banner_shelf', shelves.blocks.BannerShelfChooserBlock(icon='image', target_model='shelves.BannerShelf')), ('grid_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('rows_to_show', wagtail.wagtailcore.blocks.IntegerBlock(default=0)), ('items', wagtail.wagtailcore.blocks.StreamBlock((('oneyou1_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='folder-inverse', label='OneYou1 teaser')), ('video_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(help_text='Click this image plays the video')), ('video', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='media')), ('image_teaser', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock()), ('meta_variant', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('light-bg', 'Light Background'), ('dark-bg', 'Dark Background')], label='Variant')), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='pick', label='Inspiration teaser')), ('app_teaser', shelves.blocks.AppTeaserChooserBlock(icon='image', target_model='shelves.AppTeaser')), ('information_panel', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('body', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), ('image', shelves.blocks.BlobImageChooserBlock(required=False)), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items', required=False, verbose_name='cta'))), icon='image', target_model='shelves.AppTeaser'))), icon='arrow-left', label='Items')), ('meta_layout', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('full_width', 'Full Width'), ('2_col_1_on_mobile', 'Responsive (2 columns on desktop)'), ('3_col_1_on_mobile', 'Responsive (3 columns on desktop)')], help_text='Use this to select number of columns on desktop (only one column on mobile)', label='Layout')), ('meta_image_display', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('contain', 'Contain'), ('cover', 'Stretch')], label='Teaser Image Display')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='form')), ('find_out_more_dropdown', wagtail.wagtailcore.blocks.StructBlock((('image_meta', wagtail.wagtailcore.blocks.TextBlock(required=False)), ('mobile_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('desktop_use_renditions', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False)), ('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta', wagtail.wagtailcore.blocks.StreamBlock((('simple_menu_item', wagtail.wagtailcore.blocks.StructBlock((('link_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('link_external', wagtail.wagtailcore.blocks.CharBlock(label='External link', required=False)), ('link_page', pages.blocks.MenuItemPageBlock(required=False))))),), icon='arrow-left', label='Items')), ('shelf_id', pages.blocks.IDBlock(label='ID', required=False))), icon='order-down', label='Link dropdown')), ('iframe_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('src', wagtail.wagtailcore.blocks.CharBlock(label='Source URl', required=True)), ('frame_border', wagtail.wagtailcore.blocks.IntegerBlock(default=0, required=False)), ('scrolling', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('width', wagtail.wagtailcore.blocks.IntegerBlock(default=100, required=False)), ('height', wagtail.wagtailcore.blocks.IntegerBlock(default=100, required=False)), ('sandbox', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('shelf_id', wagtail.wagtailcore.blocks.CharBlock(label='ID', required=False))), icon='placeholder', label='IFrame')), ('divider', wagtail.wagtailcore.blocks.StructBlock((('shelf_id', pages.blocks.IDBlock(help_text='Not displayed in the front end', label='ID', required=False)),), icon='horizontalrule', label='Divider')), ('article_page_heading_shelf', wagtail.wagtailcore.blocks.StructBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('display_back_button', wagtail.wagtailcore.blocks.BooleanBlock(default=True, label='Display a back button', required=False)), ('back_button_label', wagtail.wagtailcore.blocks.CharBlock(required=False))), icon='title', label='Article Page Heading'))), blank=True, null=True),
        ),
    ]
