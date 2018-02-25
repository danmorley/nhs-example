from wagtail.wagtailsnippets.blocks import SnippetChooserBlock

from shelves.serializers import PromoShelfSerializer, BannerShelfSerializer, AppShelfSerializer


class PromoShelfChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return PromoShelfSerializer(context=context).to_representation(value)


class BannerShelfChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return BannerShelfSerializer(context=context).to_representation(value)


class AppShelfChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return AppShelfSerializer(context=context).to_representation(value)
