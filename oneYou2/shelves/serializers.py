from collections import OrderedDict

from rest_framework import serializers
from rest_framework.fields import SkipField
from rest_framework.relations import PKOnlyObject
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

    class Meta:
        model = PromoShelf
        fields = ['heading']


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
        return representation

    class Meta:
        model = BannerShelf
        fields = ['heading', 'body', 'background_image', 'cta_text', 'cta_link', 'cta_page']


class AppShelfSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = AppShelf
        fields = ['heading']