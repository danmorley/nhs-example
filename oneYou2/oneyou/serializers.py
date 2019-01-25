from rest_framework.serializers import HyperlinkedModelSerializer

from django.apps import apps

from dctcmsbase.serializers import GeneralShelvePageSerializer

from images.models import PHEImage

from .sharedcontent import Action


class OneYouPageSerializer(GeneralShelvePageSerializer):
    class Meta(GeneralShelvePageSerializer.Meta):
        model = apps.get_model('oneyou', 'OneYouPage')


class ActionSerializer(HyperlinkedModelSerializer):

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        return representation

    class Meta:
        model = Action
        fields = ['paragon_id', 'action_code', 'title', 'rich_text_body', 'cta_googleplay', 'cta_appstore',
                  'shelf_id', 'position', 'paragon_action_code', 'category', 'cta_type', 'cta1_text', 'cta1_link',
                  'cta2_text', 'cta2_link', 'active']



class RecipePageSerializer(GeneralShelvePageSerializer):
    body = None

    def to_representation(self, data):
        serialized_data = super(RecipePageSerializer, self).to_representation(data, False)
        serialized_data['meta']['type'] = 'recipe_page'

        image_id = serialized_data['header_image']
        if image_id:
                image_object = PHEImage.objects.get(id=image_id)
                serialized_data['header_image'] = {
                    'desktop': image_object.generate_and_get_rendition(
                        serialized_data['header_image_desktop_rendition'],
                    ),
                    'mobile': image_object.generate_and_get_rendition(
                        serialized_data['header_image_mobile_rendition'],
                    ),
                }
                del(serialized_data['header_image_desktop_rendition'])
                del(serialized_data['header_image_mobile_rendition'])

        return serialized_data

    class Meta(GeneralShelvePageSerializer.Meta):

        def get_fields():
            return (
                'id',
                'title',
                'page_theme',
                'header_image',
                'header_image_mobile_rendition',
                'header_image_desktop_rendition',
                'recipe_name',
                'tags',
                'serves',
                'preparation_time',
                'difficulty',
                'ingredients_list',
                'instructions',
                'video_id',
                'host',
                'header_gradient',
            )

        model = apps.get_model('oneyou', 'RecipePage')
        fields = get_fields() + GeneralShelvePageSerializer.Meta.meta_fields