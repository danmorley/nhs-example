from django.http import Http404

from wagtail.core.models import Site

from oneYou2.test.utils import OneYouTests

from home.models import SiteSettings

from .utils import get_site_by_id_or_uuid


class ApiTests(OneYouTests):

    def test_get_site_by_id_or_uuid(self):
        # invalid customsite
        self.assertEquals(get_site_by_id_or_uuid('12'), None)

        # invalid uuid
        site = Site.objects.first()
        site_settings = SiteSettings(site_id=site.id, uid='test')
        site_settings.save()
        self.assertEquals(get_site_by_id_or_uuid('test'), site_settings)
        self.assertEquals(get_site_by_id_or_uuid('test1'), None)

        #correct
        self.assertEquals(get_site_by_id_or_uuid(str(site_settings.id)), site_settings)
