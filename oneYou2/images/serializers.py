from rest_framework import serializers

from django.apps import apps
from rest_framework.fields import ReadOnlyField


class ImageSerializer(serializers.ModelSerializer):
    renditions = ReadOnlyField(source='generate_or_get_all_renditions')

    class Meta:
        model = apps.get_model('images', 'PHEImage')
        fields = (
            'title',
            'renditions',
        )
