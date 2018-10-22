import re

from oneYou2.test.utils import OneYouTests

from .renditions import ONEYOU_RENDITIONS, MOBILE_RENDITION_CHOICES, DESKTOP_RENDITION_CHOICES
from .factories import PHEImageFactory


class OneYouImageClassTests(OneYouTests):
    def test_uploading_images_creates_renditions_objects(self):
        pass

    def test_renditions_dictionary(self):
        phe_image = PHEImageFactory()
        expected_rendition_keys = ['original']
        for rendition in ONEYOU_RENDITIONS:
            expected_rendition_keys.append('{}/{}/{}/mobile'.format(rendition[0], rendition[1], rendition[2]))
            expected_rendition_keys.append('{}/{}/{}/desktop'.format(rendition[0], rendition[1], rendition[2]))
        for rendition in MOBILE_RENDITION_CHOICES + DESKTOP_RENDITION_CHOICES:
            if re.match( r'[0-9]+x[0-9]+', rendition[0], re.I):
                expected_rendition_keys.append(rendition[0])
        all_renditions = phe_image.generate_or_get_all_renditions()
        self.assertEqual(sorted(expected_rendition_keys), sorted(list(all_renditions.keys())))
        phe_image.delete()

    def test_rendition_files_and_sizes(self):
        pass


class OneYouImageAPITests(OneYouTests):
    def test_something(self):
        pass
