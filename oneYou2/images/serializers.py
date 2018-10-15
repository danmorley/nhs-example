from rest_framework import serializers

from django.apps import apps
from rest_framework.fields import ReadOnlyField


def get_PHEImage_model():
    from images.models import PHEImage
    return PHEImage

class ImageSerializer(serializers.ModelSerializer):
    renditions = ReadOnlyField(source='generate_or_get_all_renditions')

    class Meta:
        model = get_PHEImage_model()
        fields = (
            'title',
            'renditions',
        )
