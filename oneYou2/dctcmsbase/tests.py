from dctcmsbase.factories import create_test_banner
from oneYou2.test.utils import OneYouTests


class BannerModelTests(OneYouTests):
    def test_meta_layout_returns_the_correct_value(self):
        banner = create_test_banner()
        expected_value = 'cta_on_right'
        self.assertEqual(expected_value, banner.meta_layout)

    def test_meta_variant_returns_the_correct_value(self):
        banner = create_test_banner()
        expected_value = 'how-are-you'
        self.assertEqual(expected_value, banner.meta_variant)