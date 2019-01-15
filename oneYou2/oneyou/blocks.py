from wagtail.snippets.blocks import SnippetChooserBlock


class ActionChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        from .serializers import ActionSerializer
        return ActionSerializer(context=context).to_representation(value)
