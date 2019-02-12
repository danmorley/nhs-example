from django.apps import apps

from dctcmsbase.serializers import GeneralShelvePageSerializer


class SexHealthPageSerializer(GeneralShelvePageSerializer):
    class Meta(GeneralShelvePageSerializer.Meta):
        model = apps.get_model('sexhealth', 'SexHealthPage')


class ArticleSexHealthPageSerializer(GeneralShelvePageSerializer):
    class Meta(GeneralShelvePageSerializer.Meta):
        model = apps.get_model('sexhealth', 'ArticleSexHealthPage')