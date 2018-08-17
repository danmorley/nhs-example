from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock

from shelves.serializers import PromoShelfSerializer, BannerShelfSerializer, AppTeaserSerializer, \
    RecipeTeaserSerializer, ActionSerializer

from .serializers import ImageSerializer


class PromoShelfChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return PromoShelfSerializer(context=context).to_representation(value)


class BannerShelfChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return BannerShelfSerializer(context=context).to_representation(value)


class AppTeaserChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return AppTeaserSerializer(context=context).to_representation(value)


class RecipeTeaserChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return RecipeTeaserSerializer(context=context).to_representation(value)


class BlobImageChooserBlock(ImageChooserBlock):
    def get_api_representation(self, value, context=None):
        return ImageSerializer(context=context).to_representation(value)


class ActionChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return ActionSerializer(context=context).to_representation(value)
