from oneYou2.test.utils import OneYouTests

from oneYou2.utils import get_release_version


class OneYouUtilsTests(OneYouTests):
    def test_get_release_version_returns_release_id(self):
        # given
        expected_value = open('version.txt').read()

        # when
        actual_value = get_release_version()

        # then
        self.assertEqual(actual_value, expected_value)
