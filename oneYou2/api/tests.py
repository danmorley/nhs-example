from django.http import Http404

from .utils import get_site_by_id_or_uuid, get_site_or_404

from home.factories import create_test_site_settings

from oneYou2.test.utils import OneYouTests


class ApiUtilsTests(OneYouTests):
    def test_get_site_by_id_or_uuid_returns_a_site_if_provided_a_valid_id(self):
        site = create_test_site_settings()
        response = get_site_by_id_or_uuid(site.id)
        self.assertEquals(response, site)

    def test_get_site_by_id_or_uuid_returns_a_site_if_provided_a_valid_uuid(self):
        site = create_test_site_settings()
        response = get_site_by_id_or_uuid(site.uid)
        self.assertEquals(response, site)

    def test_get_site_by_id_or_uuid_returns_none_if_provided_an_invalid_id(self):
        response = get_site_by_id_or_uuid(0)
        self.assertEquals(response, None)

    def test_get_site_by_id_or_uuid_returns_none_if_provided_an_invalid_uuid(self):
        response = get_site_by_id_or_uuid('test-uuid')
        self.assertEquals(response, None)

    def test_get_site_or_404_returns_a_site_if_provided_a_valid_id(self):
        site = create_test_site_settings()
        response = get_site_or_404(site.id)
        self.assertEquals(response, site)

    def test_get_site_or_404_returns_a_site_if_provided_a_valid_uuid(self):
        site = create_test_site_settings()
        response = get_site_or_404(site.uid)
        self.assertEquals(response, site)

    def test_get_site_or_404_returns_404_if_provided_an_invalid_id(self):
        error_is_thrown = False
        try:
            get_site_or_404(0)
        except Http404:
            error_is_thrown = True
        self.assertIsTrue(error_is_thrown)

    def test_get_site_or_404_returns_none_if_provided_an_invalid_id(self):
        error_is_thrown = False
        try:
            get_site_or_404('test-uuid')
        except Http404:
            error_is_thrown = True
        self.assertIsTrue(error_is_thrown)
