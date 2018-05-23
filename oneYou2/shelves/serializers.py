from django.utils.text import slugify

from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from shelves.models import PromoShelf, BannerShelf, AppTeaser


# TODO: Remove this, use the one in image.serializers. This exists due to circular imports.
class ImageSerializer(serializers.Serializer):
    title = serializers.CharField()

    def to_representation(self, data):
        serialized_data = super(ImageSerializer, self).to_representation(data)
        if data:
            serialized_data['renditions'] = data.generate_or_get_all_renditions()
        else:
            serialized_data['renditions'] = {}
        return serialized_data

    class Meta:
        fields = ['title', ]


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


class PromoShelfSerializer(HyperlinkedModelSerializer):
    cta_page = CTAPageSerializer()

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
                "id": cta_page.get('id'),
                "slug": cta_page.get('slug'),
                "relative_path": cta_page.get('relative_path'),
            }

        representation['shelf_id'] = slugify(representation['shelf_id'])
        return representation

    class Meta:
        model = PromoShelf
        fields = ['heading', 'cta_text', 'cta_link', 'cta_page', 'shelf_id', 'meta_layout', 'meta_variant']


class BannerShelfSerializer(HyperlinkedModelSerializer):
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
                "id": cta_page.get('id'),
                "slug": cta_page.get('slug'),
                "relative_path": cta_page.get('relative_path'),
            }

        representation['shelf_id'] = slugify(representation['shelf_id'])
        return representation

    class Meta:
        model = BannerShelf
        fields = ['heading', 'body', 'background_image', 'meta_gradient', 'cta_text', 'cta_link', 'cta_page',
                  'shelf_id', 'meta_layout', 'meta_variant']


class AppTeaserSerializer(HyperlinkedModelSerializer):
    image = ImageSerializer()

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        cta_appstore = representation.pop('cta_appstore')
        cta_googleplay = representation.pop('cta_googleplay')
        if cta_appstore:
            representation['cta_appstore'] = {
                'link_text': "",
                'link_external': cta_appstore,
            }
        if cta_googleplay:
            representation['cta_googleplay'] = {
                'link_text': "",
                'link_external': cta_googleplay,
            }
        return representation

    class Meta:
        model = AppTeaser
        fields = ['heading', 'body', 'image', 'cta_googleplay', 'cta_appstore', 'shelf_id']
