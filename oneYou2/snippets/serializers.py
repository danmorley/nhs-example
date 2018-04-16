from rest_framework import serializers

from django.apps import apps
from rest_framework.fields import ReadOnlyField

from wagtail.api.v2.serializers import StreamField

from images.serializers import ImageSerializer


class MenuSerializer(serializers.ModelSerializer):
    items = StreamField(source='menu_items')

    class Meta:
        model = apps.get_model('pages', 'Menu')
        fields = (
            'items',
        )


class FooterSerializer(serializers.ModelSerializer):
    items = StreamField(source='menu_items')
    social_media = StreamField(source='follow_us')
    image = ImageSerializer()

    class Meta:
        model = apps.get_model('pages', 'Footer')
        fields = (
            'items',
            'social_media',
            'image',
        )


class HeaderSerializer(serializers.ModelSerializer):
    title = ReadOnlyField(source='label')

    class Meta:
        model = apps.get_model('pages', 'Header')
        fields = (
            'title',
            'image'
        )
