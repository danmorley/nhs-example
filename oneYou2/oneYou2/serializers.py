from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from django.apps import apps

from snippets.serializers import MenuSerializer, FooterSerializer


class RedirectSerializer(serializers.ModelSerializer):
    # TODO: This needs some work, prob a custom field for destination
    source = ReadOnlyField(source='old_path')
    destination = ReadOnlyField(source='link')

    class Meta:
        model = apps.get_model('wagtailredirects', 'Redirect')
        fields = (
            'source',
            'destination',
            'is_permanent'
        )


class SiteSerializer(serializers.ModelSerializer):
    id = ReadOnlyField(source='site.id')
    hostname = ReadOnlyField(source='site.hostname')
    site_uid = ReadOnlyField(source='site.site_name')
    site_name = ReadOnlyField(source='site.site_name')
    is_default_site = ReadOnlyField(source='site.is_default_site')
    menu = MenuSerializer()
    footer = FooterSerializer()
    redirects = RedirectSerializer(source='site.redirects', many=True, read_only=True)
    release_id = ReadOnlyField(source='release_uuid')

    def to_representation(self, data):
        # It's slightly weird that I do this a different way in the page serializer
        meta_fields = getattr(self.Meta, 'meta_fields')
        serialized_data = super(SiteSerializer, self).to_representation(data)
        serialized_data['meta'] = {}
        for meta_field in meta_fields:
            try:
                meta_field_value = serialized_data.pop(meta_field)
                serialized_data['meta'][meta_field] = meta_field_value
            except KeyError:
                pass

        return serialized_data

    class Meta:
        model = apps.get_model('wagtailcore', 'Site')
        fields = (
            'id',
            'hostname',
            'release_id',
            'site_uid',
            'port',
            'site_name',
            # 'root_page',
            'is_default_site',
            'menu',
            'footer',
            'redirects',
            # pages,
        )
        meta_fields = (
            'hostname',
            'release_id',
            'site_uid'
        )
