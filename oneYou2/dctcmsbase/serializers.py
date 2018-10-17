from rest_framework import serializers

from django.apps import apps
from django.utils.text import slugify

from wagtail.api.v2.serializers import StreamField

from rest_framework.serializers import HyperlinkedModelSerializer

from .utils import replace_resource_ids_with_links_for_download
from .sharedcontent import BannerPanel


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
            replace_resource_ids_with_links_for_download(shelf)
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

        fields = get_fields() + get_meta_fields() + get_social_fields() + get_tracking_fields()
        meta_fields = get_meta_fields()


class CTAPageSerializer(serializers.Serializer):
    id = serializers.CharField()
    slug = serializers.CharField()

    def to_representation(self, value):
        serialized_data = super(CTAPageSerializer, self).to_representation(value)
        if value:
            site_name = value.get_site().site_name
            url_parts = value.get_url_parts()
            serialized_data['relative_path'] = '/{}{}'.format(site_name.lower(), url_parts[2])

        return serialized_data


class BannerPanelSerializer(HyperlinkedModelSerializer):
    from images.serializers import ImageSerializer

    cta_page = CTAPageSerializer()
    background_image = ImageSerializer()

    def to_representation(self, obj):
        """Move fields from profile to user representation."""
        representation = super().to_representation(obj)
        cta_text = representation.pop('cta_text')
        cta_link = representation.pop('cta_link')
        cta_page = representation.pop('cta_page')
        representation['cta'] = {
            'link_text': cta_text,
            'link_external': cta_link,
        }
        if cta_page:
            representation['cta']['link_page'] = {
                'id': cta_page.get('id'),
                'slug': cta_page.get('slug'),
                'relative_path': cta_page.get('relative_path'),
            }
        
        """Remove unnecessary renditions"""
        mobile_rendition = obj.background_image_mobile_rendition
        desktop_rendition = obj.background_image_desktop_rendition
        meta_variant = representation.pop('meta_variant')
        representation['background_image']['renditions'] = {
            'mobile': representation['background_image']['renditions'][mobile_rendition],
            'desktop': representation['background_image']['renditions'][desktop_rendition],
            'meta_variant': meta_variant,
        }

        representation['shelf_id'] = slugify(representation['shelf_id'])
        return representation

    class Meta:
        model = BannerPanel
        fields = ['heading', 'body', 'background_image', 'meta_variant', 'cta_text', 'cta_link', 'cta_page',
                  'shelf_id', 'meta_layout', 'meta_variant']