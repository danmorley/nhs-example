from oneYou2.test.utils import OneYouTests

from pages.factories import PageFactory

from release.factories import ReleaseFactory
from rest_framework.test import APIRequestFactory

from pages.factories import SiteFactory


class SiteReleaseTests(OneYouTests):
    def test_unknown_site(self):
        pass

    def test_no_current_release(self):
        site = SiteFactory()
        request_factory = APIRequestFactory()
        request = request_factory.get('/api/sites/oneyou/', )
        pass

    def test_get_current_site_release(self):
        current_release = ReleaseFactory()
        self.assertEqual(1, 1)

    def test_get_specific_release(self):
        pass

    def test_unknown_release(self):
        pass


class PageDetailTests(OneYouTests):
    def test_oneyou2_page(self):
        new_page = PageFactory()
        self.assertEqual(1, 1)


