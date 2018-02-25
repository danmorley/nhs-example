from rest_framework.serializers import HyperlinkedModelSerializer
from shelves.models import PromoShelf, BannerShelf, AppShelf


class PromoShelfSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = PromoShelf
        fields = ['heading']


class BannerShelfSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = BannerShelf
        fields = ['heading']


class AppShelfSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = AppShelf
        fields = ['heading']