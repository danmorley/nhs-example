from wagtail.tests.utils import WagtailPageTests


class OneYouTests(WagtailPageTests):

    def assertIsTrue(self, value):
        self.assertIs(value, True)

    def assertIsFalse(self, value):
        self.assertIs(value, False)

    def login(self):
        user = self.create_test_user()
        return user
