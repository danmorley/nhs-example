from rest_framework import serializers

from django.apps import apps
from rest_framework.fields import ReadOnlyField


class ImageSerializer(serializers.ModelSerializer):
    image = ReadOnlyField(source='file.url')

    class Meta:
        model = apps.get_model('images', 'PHEImage')
        fields = (
            'title',
            'image',
        )
