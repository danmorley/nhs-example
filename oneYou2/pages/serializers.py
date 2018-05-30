from rest_framework import serializers

from django.apps import apps
from wagtail.api.v2.serializers import StreamField

from .utils import determine_image_rendtions_for_shared_content_shelves


class OneYouPageSerializer(serializers.ModelSerializer):
    body = StreamField()

    def to_representation(self, data):
        meta_fields = getattr(self.Meta, 'meta_fields')
        serialized_data = super(OneYouPageSerializer, self).to_representation(data)
        serialized_data['meta'] = {}
        for meta_field in meta_fields:
            try:
                meta_field_value = serialized_data.pop(meta_field)
                serialized_data['meta'][meta_field] = meta_field_value
            except KeyError:
                pass

        for shelf in serialized_data['body']:
            determine_image_rendtions_for_shared_content_shelves(shelf)

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
            'page_ref',
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
            # 'page_ref',
            # 'depth',
            # 'numchild',
            # 'preview',

            # 'revision'

        )


class RecipePageSerializer(OneYouPageSerializer):
    body = StreamField()

    def to_representation(self, data):
        print('to_representation')
        serialized_data = super(RecipePageSerializer, self).to_representation(data)
        return serialized_data

    class Meta:
        model = apps.get_model('pages', 'RecipePage')
        fields = (
            'id',
            'title',
            'body',
            'recipe_name',
            'tags',
            'serves',
            'preparation_time',
            'difficulty',
            'ingredients_list',
            'instructions',
            'page_ref',
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
        )

        fields = fields + meta_fields
