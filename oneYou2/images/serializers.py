from rest_framework import serializers

from django.apps import apps
from rest_framework.fields import ReadOnlyField

from images.models import PHEImage

def get_PHEImage_model():
    from images.models import PHEImage
    return PHEImage

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PHEImage
        fields = ()
