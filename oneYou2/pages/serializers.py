from rest_framework import serializers

from django.apps import apps
from wagtail.api.v2.serializers import StreamField


# TODO: Some rationalisation can be done here. We currently just copy the default wagtail format

class OneYouPageSerializer(serializers.ModelSerializer):
    body = StreamField()

    def to_representation(self, data):
        # It's slightly weird that I do this a different way in the page serializer
        meta_fields = getattr(self.Meta, 'meta_fields')
        serialized_data = super(OneYouPageSerializer, self).to_representation(data)
        serialized_data['meta'] = {}
        for meta_field in meta_fields:
            try:
                meta_field_value = serialized_data.pop(meta_field)
                serialized_data['meta'][meta_field] = meta_field_value
            except KeyError:
                pass

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
