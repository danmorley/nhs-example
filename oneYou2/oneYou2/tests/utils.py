from wagtail.tests.utils import WagtailPageTests

class OneYouTests(WagtailPageTests):

    def assertIsTrue(self, value):
        self.assertIs(value, True)

    def assertIsFalse(self, value):
        self.assertIs(value, False)