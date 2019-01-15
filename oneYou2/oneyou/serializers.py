from rest_framework.serializers import HyperlinkedModelSerializer

from django.apps import apps

from dctcmsbase.serializers import GeneralShelvePageSerializer

from .sharedcontent import Action


class OneYouPageSerializer(GeneralShelvePageSerializer):
    class Meta(GeneralShelvePageSerializer.Meta):
        # TODO check if class have Tracking and Social as parent
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
