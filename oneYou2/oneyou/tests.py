from wagtail.core.blocks.stream_block import StreamValue
from wagtail.core.blocks.struct_block import StructValue

from dctcmsbase.factories import create_test_banner
from dctcmsbase.utils import get_serializable_data_for_fields, process_inlines
from images.models import PHEImage
from oneYou2.test.utils import OneYouTests

from oneyou.models import OneYouPage
from oneyou.factories import create_test_page


class PagesUtilsTests(OneYouTests):
    def test_get_serializable_data_for_fields_correctly_serialises_the_page(self):
        page = create_test_page()
        field = OneYouPage._meta.get_field('body')
        page.body = StreamValue(field.stream_block,
                                [('section_heading_shelf',
                                  StructValue([('heading', 'This is a section heading'), ('shelf_id', 'shelf1')]))])
        serialized_data = get_serializable_data_for_fields(page)

        self.assertEqual(type(serialized_data), dict)

    def test_replace_embeds_with_links_correctly_turns_embeds_into_img_tags(self):
        image = PHEImage(width=100, height=100)
        image.save()
        image_id = image.id
        rich_text_source = '<p><embed alt="one_you_logo.png" embedtype="image" format="right" id="'\
                           + str(image_id) + '"/><br/></p>'
        processed_content = process_inlines(rich_text_source)
        self.assertNotEquals(rich_text_source, processed_content)
        self.assertIsFalse('<embed' in processed_content)
        self.assertIsTrue('<img' in processed_content)

    def test_replace_internal_links_correctly_returns_a_tag_with_hrf(self):
        page = create_test_page()
        rich_text_source = '<p><a id="{}" linktype="page">link 1</a></p>'.format(page.id)
        processed_content = process_inlines(rich_text_source)
        self.assertNotEquals(rich_text_source, processed_content)
        self.assertIsTrue('<a' in processed_content)
        self.assertIsTrue('href="' in processed_content)