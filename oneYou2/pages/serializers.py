from rest_framework import serializers

from django.apps import apps
from wagtail.api.v2.serializers import StreamField

from images.models import PHEImage
from .utils import determine_image_rendtions_for_shared_content_shelves, replace_resource_ids_with_links_for_download


class OneYou2PageSerializer(serializers.ModelSerializer):
    body = StreamField()

    def to_representation(self, data):
        meta_fields = getattr(self.Meta, 'meta_fields')
        serialized_data = super(OneYou2PageSerializer, self).to_representation(data)
        serialized_data['meta'] = {}
        for meta_field in meta_fields:
            try:
                meta_field_value = serialized_data.pop(meta_field)
                serialized_data['meta'][meta_field] = meta_field_value
            except KeyError:
                pass
        serialized_data['meta']['type'] = 'general_page'
        for shelf in serialized_data['body']:
            determine_image_rendtions_for_shared_content_shelves(shelf)
            replace_resource_ids_with_links_for_download(shelf)
            shelf_id = shelf.get('id', None)
            if shelf_id:
                shelf['id'] = 'p%s-%s' % (data.id, shelf_id)

        serialized_data['meta']['breadcrumbs'] = data.breadcrumbs

        return serialized_data

    class Meta:
        model = apps.get_model('pages', 'OneYou2Page')
        fields = (
            'id',
            'title',
            'body',
            # 'path',
            # 'depth',
            # 'numchild',
            # 'live',
            'page_theme'
        )

        meta_fields = (
            # 'type',
            'slug',
            # 'html_url',
            # 'detail_url',
            'show_in_menus',

            'seo_title',
            'search_description',
            'first_published_at',
            # 'parent',

            # OpenGraph fields
            'og_title',
            'og_description',
            'og_url',
            'og_image',
            'og_type',

            # Twitter fields
            'twitter_url',
            'twitter_card',
            'twitter_site',
            'twitter_title',
            'twitter_description',
            'twitter_image',

            'use_share_button',
            'use_email_button',
            'use_print_button',

            'opt_in_1_text',
            'opt_in_2_text',
            'ts_and_cs_statement',

            'tracking_group'
        )

        fields = fields + meta_fields


class OneYouPageListSerializer(serializers.ModelSerializer):

    class Meta:
        model = apps.get_model('pages', 'OneYou2Page')
        fields = (
            'id',
            # 'detail_url',
            # 'relative_path'
            # 'title',
            'slug',
            # 'depth',
            # 'numchild',
            # 'preview',

            # 'revision'

        )


class RecipePageSerializer(serializers.ModelSerializer):
    body = StreamField()

    def to_representation(self, data):
        meta_fields = getattr(self.Meta, 'meta_fields')
        serialized_data = super(RecipePageSerializer, self).to_representation(data)
        serialized_data['meta'] = {}
        for meta_field in meta_fields:
            try:
                meta_field_value = serialized_data.pop(meta_field)
                serialized_data['meta'][meta_field] = meta_field_value
            except KeyError:
                pass

        serialized_data['meta']['type'] = 'recipe_page'
        image_id = serialized_data['image']
        if image_id:
            image_object = PHEImage.objects.get(id=image_id)
            renditions = image_object.generate_or_get_all_renditions()
            serialized_data['image'] = {
                'desktop': renditions['banner_shelf/None/None/desktop'],
                'mobile': renditions['banner_shelf/None/None/mobile']
            }

        serialized_data['meta']['breadcrumbs'] = data.breadcrumbs

        return serialized_data

    class Meta:
        model = apps.get_model('pages', 'RecipePage')
        fields = (
            'id',
            'title',
            'image',
            'body',
            'recipe_name',
            'tags',
            'serves',
            'preparation_time',
            'difficulty',
            'ingredients_list',
            'instructions',
            'page_theme'
        )

        meta_fields = (
            # 'type',
            'slug',
            # 'html_url',
            # 'detail_url',
            'show_in_menus',

            'seo_title',
            'search_description',
            'first_published_at',
            # 'parent',

            # OpenGraph fields
            'og_title',
            'og_description',
            'og_url',
            'og_image',
            'og_type',

            # Twitter fields
            'twitter_url',
            'twitter_card',
            'twitter_site',
            'twitter_title',
            'twitter_description',
            'twitter_image',

            'use_share_button',
            'use_email_button',
            'use_print_button',
        )

        fields = fields + meta_fields
