from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from django.apps import apps
from django.utils.text import slugify

from wagtail.api.v2.serializers import StreamField

from home.models import SiteSettings

from .sharedcontent import Banner, AppTeaser


class GeneralShelvePageSerializer(serializers.ModelSerializer):
    body = StreamField()

    def to_representation(self, data):
        meta_fields = getattr(self.Meta, 'meta_fields')
        serialized_data = super(GeneralShelvePageSerializer, self).to_representation(data)
        serialized_data['meta'] = {}
        for meta_field in meta_fields:
            try:
                meta_field_value = serialized_data.pop(meta_field)
                serialized_data['meta'][meta_field] = meta_field_value
            except KeyError:
                pass
        serialized_data['meta']['type'] = 'general_page'
        for shelf in serialized_data['body']:
            shelf_id = shelf.get('id', None)
            if shelf_id:
                shelf['id'] = 'p%s-%s' % (data.id, shelf_id)

        serialized_data['meta']['breadcrumbs'] = data.breadcrumbs

        return serialized_data

    class Meta:

        def get_fields():
            return (
                'id',
                'title',
                'body',
                'page_theme',
            )

        def get_meta_fields():
            return (
                'slug',
                'show_in_menus',
                'seo_title',
                'search_description',
                'first_published_at',
            )

        def get_social_fields():
            return (
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

        def get_tracking_fields():
            return (
                'tracking_group',
            )

        abstract = True

        meta_fields = get_meta_fields() + get_social_fields() + get_tracking_fields()
        fields = get_fields() + meta_fields


class CTAPageSerializer(serializers.Serializer):
    id = serializers.CharField()
    slug = serializers.CharField()

    def to_representation(self, value):
        serialized_data = super(CTAPageSerializer, self).to_representation(value)
        if value:
            site_name = SiteSettings.objects.get(site=value.get_site()).uid
            url_parts = value.get_url_parts()
            serialized_data['relative_path'] = '/{}{}'.format(site_name, url_parts[2])

        return serialized_data


class BannerSerializer(HyperlinkedModelSerializer):

    attributes = StreamField()
    ctas = StreamField()

    def to_representation(self, obj):
        """Move fields from profile to user representation."""
        representation = super().to_representation(obj)
        representation['shelf_id'] = slugify(representation['shelf_id'])
        return representation


    class Meta:
        model = Banner
        fields = ['shelf_id', 'heading', 'body', 'attributes', 'ctas']


class AppTeaserSerializer(HyperlinkedModelSerializer):

    attributes = StreamField()
    ctas = StreamField()

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        cta_appstore = representation.pop('cta_appstore')
        cta_googleplay = representation.pop('cta_googleplay')
        if cta_appstore:
            representation['cta_appstore'] = {
                'link_text': '',
                'link_external': cta_appstore,
            }
        if cta_googleplay:
            representation['cta_googleplay'] = {
                'link_text': '',
                'link_external': cta_googleplay,
            }

        # cta_text = representation.pop('cta_text')
        # cta_link = representation.pop('cta_link')
        # cta_page = representation.pop('cta_page')
        # representation['cta'] = {
        #     'link_text': cta_text,
        #     'link_external': cta_link,
        # }
        # if cta_page:
        #     representation['cta']['link_page'] = {
        #         'id': cta_page.get('id'),
        #         'slug': cta_page.get('slug'),
        #         'relative_path': cta_page.get('relative_path'),
        #     }
        return representation

    class Meta:
        model = AppTeaser
        fields = ['shelf_id', 'heading', 'body', 'attributes', 'ctas', 'cta_googleplay', 'cta_appstore']
