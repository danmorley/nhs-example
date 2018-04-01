from rest_framework import serializers

from django.apps import apps
from rest_framework.fields import ReadOnlyField
from wagtail.api.v2.serializers import StreamField


# TODO: Some rationalisation can be done here. We currently just copy the default wagtail format

class OneYouPageSerializer(serializers.ModelSerializer):
    meta = ReadOnlyField(source='meta_data')
    body = StreamField()

    class Meta:
        model = apps.get_model('pages', 'OneYou2Page')
        fields = (
            'id',
            'meta',
            'title',
            'body',
            # 'path',
            # 'depth',
            # 'numchild',
            'page_ref',
            # 'live',
            'page_theme'
        )


class OneYouPageMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = apps.get_model('pages', 'OneYou2Page')
        fields = (
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
        )


class OneYouPageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = apps.get_model('pages', 'OneYou2Page')
        fields = (
            'id',
            # 'detail_url',
            # 'relative_path'
            # 'title',
            # 'slug',
            # 'page_ref',
            # 'depth',
            # 'numchild',
            # 'preview',

            # 'revision'

        )
