from django.utils.text import slugify

from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from shelves.models import PromoShelf, BannerShelf, AppShelf


class ImageSerializer(serializers.Serializer):
    title = serializers.CharField()
    link = serializers.CharField()

    class Meta:
        fields = ['title', 'link']


class CTAPageSerializer(serializers.Serializer):
    id = serializers.CharField()


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
            'link_page': cta_page['id'],
        }
        representation['shelf_id'] = slugify(representation['shelf_id'])
        return representation

    class Meta:
        model = PromoShelf
        fields = ['heading', 'cta_text', 'cta_link', 'cta_page', 'shelf_id']


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
            'link_page': cta_page['id'],
        }
        representation['shelf_id'] = slugify(representation['shelf_id'])
        return representation

    class Meta:
        model = BannerShelf
        fields = ['heading', 'body', 'background_image', 'cta_text', 'cta_link', 'cta_page', 'shelf_id']


class AppShelfSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = AppShelf
        fields = ['heading', 'body', 'image', 'android_link', 'iphone_link']