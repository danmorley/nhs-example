from django.apps import apps

from dctcmsbase.serializers import GeneralShelvePageSerializer


class SexHealthPageSerializer(GeneralShelvePageSerializer):
    class Meta(GeneralShelvePageSerializer.Meta):
        # TODO check if class have Tracking and Social as parent
        model = apps.get_model('sexhealth', 'SexHealthPage')