from dctcmsbase.factories import create_test_banner
from oneYou2.test.utils import OneYouTests


class BannerModelTests(OneYouTests):
    def test_heading_value(self):
        banner = create_test_banner()
        expected_value = 'Test heading'
        self.assertEqual(expected_value, banner.heading)

#     def test_meta_variant_returns_the_correct_value(self):
#         banner = create_test_banner()
#         expected_value = 'how-are-you'
#         self.assertEqual(expected_value, banner.meta_variant)