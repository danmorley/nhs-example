import random
import string

from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.forms import model_to_dict
from django.shortcuts import redirect

from wagtail.admin.utils import user_passes_test, user_has_any_page_permission
from wagtail.core.blocks import StreamBlock
from wagtail.core.blocks.stream_block import StreamValue
from wagtail.core.blocks.struct_block import StructValue
from wagtail.core.models import Page

from dctcmsbase.blocks import (BackgroundImageBlock, PositionedImageBlock, SimpleCtaLinkBlock, AppTeaserChooserBlock,
    ImageBlock, BannerChooserBlock, DocumentDownloadBlock)
from dctcmsbase.panels import (StandardRichTextPanel, CtaPanel, StandardInformationPanel, StandardVideoTeaserPanel, 
    StandardImageTeaserPanel, StandardVideoTeaserPanel, PlainTextPanel, StandardSimpleImagePanel, AccordionItemsPanel,
    AccordionPanel, InlineScriptPanel, InlineSvgPanel, AppTeaserPanel, IconCardPanel, ListItemPanel)
from dctcmsbase.sharedcontent import Banner, AppTeaser
from dctcmsbase.shelves import (PageHeadingShelf, DividerShelf, InlineScriptShelf, BannerShelf,
    FindOutMoreDropDownShelf, InlineSvgShelf, SimplePageHeadingShelf, CarouselShelf)
from dctcmsbase.stream_block import ExpandedStreamBlock
from pages.models import AccordionItem

from images.models import PHEImage
from images.renditions import ONEYOU_RENDITIONS
from oneyou.blocks import ActionChooserBlock
from oneyou.models import OneYouPage, ArticleOneYouPage
from oneyou.sharedcontent import Action
from oneyou.panels import BackwardsCompatibleContentPanel, ActionGroupPanel
from oneyou.shelves import (OneYouSectionHeadingShelf, OneYouGridShelf, OneYouTwoColumnShelf, ActionPlanShelf,
    ActionPlanDisplayShelf)
from shelves.blocks import BlobImageChooserBlock

from .models import OneYou2Page, Theme


shelves_name_conversion = {
    'promo_shelf_v2': 'promo_shelf',
    'article_page_heading_shelf': 'simple_page_heading_shelf',
    'simple_page_heading_shelf': 'page_heading_shelf',
    # 'section_heading_shelf': 'rich_text_shelf',
    'panel_carousel_shelf': 'carousel_shelf',
}

panels_name_conversion = {
    'simple_text_panel': 'plain_text_panel',
    'accordion_item': 'accordion_items_panel',
    'accordion_panel': 'accordion_item',
    'oneyou1_teaser': 'oneyou_teaser_panel',
    'banner_shelf': 'banner_panel',
}


def get_new_path(path):
    import re
    splited_path = re.findall('....', path)
    step = 1
    while(Page.objects.filter(path=path).count()):
        try:
            splited_path[-1] = str(int(splited_path[-1]) + step)
        except ValueError:
            splited_path[-1] = str(chr(ord(splited_path[-1][-1]) + 1))
        splited_path[-1] = '0' * (4 - len(splited_path[-1])) + splited_path[-1]
        path = ''.join(splited_path)
    return path


def get_renditions(image_meta):
    renditions = image_meta.split('/')
    for rendition in ONEYOU_RENDITIONS:
        if (rendition[0] == renditions[0] or (rendition[0] is None and renditions[0] == 'None')) and \
            (rendition[1] == renditions[1] or (rendition[1] is None and renditions[1] == 'None')) and \
            (rendition[2] == renditions[2] or (rendition[2] is None and renditions[2] == 'None')):
            return (rendition[3]['mobile'], rendition[3]['desktop'])
    return ('none', 'none')

    
def update_page_heading_shelf(shelf):
    (rendition_mobile, rendition_desktop) = get_renditions(shelf.value['image_meta'])

    shelf.value['background_image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', shelf.value['background_image']),
            ('meta_variant', 'gradient' if shelf.value['meta_gradient'] else 'none'),
            ('meta_mobile_rendition', rendition_mobile if shelf.value['mobile_use_renditions'] else 'none'),
            ('meta_desktop_rendition', rendition_desktop if shelf.value['desktop_use_renditions'] else 'none'),
            ('meta_image_display', 'cover'),
        ]
    )

    shelf.value['image_left'] = StructValue(PositionedImageBlock, 
        [
            ('image', shelf.value['image_left']['image']),
            ('meta_variant', 'none'),
            ('meta_mobile_rendition', rendition_mobile if shelf.value['image_left'].get('meta_use_mobile_renditions') else 'none'),
            ('meta_desktop_rendition', rendition_desktop if shelf.value['image_left'].get('meta_use_desktop_renditions') else 'none'),
            ('meta_position', shelf.value['image_left']['meta_layout']),
        ]
    )

    shelf.value['image_right'] = StructValue(PositionedImageBlock, 
        [
            ('image', shelf.value['image_right']['image']),
            ('meta_variant', 'none'),
            ('meta_mobile_rendition', rendition_mobile if shelf.value['image_right'].get('meta_use_mobile_renditions') else 'none'),
            ('meta_desktop_rendition', rendition_desktop if shelf.value['image_right'].get('meta_use_desktop_renditions') else 'none'),
            ('meta_position', shelf.value['image_right']['meta_layout']),
        ]
    )

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions', 'meta_gradient']
    for key in keys_to_remove:
        del(shelf.value[key])

    shelf.block = PageHeadingShelf()
    return shelf


def update_divider_shelf(shelf):
    shelf.block = DividerShelf()
    return shelf


def update_script_shelf(shelf):
    shelf.value['shelf_id'] = shelf.value['field_id']
    del(shelf.value['field_id'])
    shelf.block = InlineScriptShelf()
    return shelf


def get_or_create_banner(banner_values):
    try:
        return Banner.objects.get(shelf_id=banner_values.shelf_id)
    except Banner.DoesNotExist:
        contenttype = ContentType.objects.get(app_label='dctcmsbase', model='banner')
        expanded_stream_block = ExpandedStreamBlock([('background_image', BackgroundImageBlock())])
        cta_stream_block = StreamBlock([('cta', SimpleCtaLinkBlock())])

        attributes = StreamValue(expanded_stream_block, [
                ('background_image', StructValue(BackgroundImageBlock, [
                    ('image', banner_values.background_image),
                    ('meta_variant', 'gradient' if banner_values.meta_gradient else 'none'),
                    ('meta_mobile_rendition', 'none'),
                    ('meta_desktop_rendition', 'none'),
                    ('meta_image_display', 'cover'),
                ])
            )],
        )

        ctas = StreamValue(cta_stream_block, [
                ('cta', StructValue(SimpleCtaLinkBlock, [
                    ('link_text', banner_values.cta_text),
                    ('link_external', banner_values.cta_link),
                    ('link_page', banner_values.cta_page),
                    ('link_id', ''),
                    ('meta_cta_variant', 'button'),
                ])
            )],
        )

        banner = Banner.objects.create(
            shelf_id=banner_values.shelf_id,
            heading=banner_values.heading,
            body=banner_values.body,
            tracking_group=banner_values.tracking_group,
            content_type=contenttype,
            attributes=attributes,
            ctas=ctas,
        )
    return banner


def get_or_create_promo(promo_values):
    try:
        return Banner.objects.get(shelf_id=promo_values.shelf_id)
    except Banner.DoesNotExist:
        contenttype = ContentType.objects.get(app_label='dctcmsbase', model='banner')
        cta_stream_block = StreamBlock([('cta', SimpleCtaLinkBlock())])

        ctas = StreamValue(cta_stream_block, [
                ('cta', StructValue(SimpleCtaLinkBlock, [
                    ('link_text', promo_values.cta_text),
                    ('link_external', promo_values.cta_link),
                    ('link_page', promo_values.cta_page),
                    ('link_id', ''),
                    ('meta_cta_variant', 'button'),
                ])
            )],
        )

        promo = Banner.objects.create(
            shelf_id=promo_values.shelf_id,
            heading=promo_values.heading,
            tracking_group=promo_values.tracking_group,
            content_type=contenttype,
            ctas=ctas,
        )
    return promo




def get_or_create_action(action_values):
    try:
        return Action.objects.get(title=action_values.title)
    except Action.DoesNotExist:
        contenttype = ContentType.objects.get(app_label='oneyou', model='action')

        action = Action.objects.create(
            paragon_id=action_values.paragon_id,
            paragon_action_code=action_values.paragon_action_code,
            category=action_values.category,
            position=action_values.position,
            action_code=action_values.action_code,
            title=action_values.title,
            rich_text_body=action_values.rich_text_body,
            active=action_values.active,
            cta_type=action_values.cta_type,
            cta1_text=action_values.cta1_text,
            cta1_link=action_values.cta1_link,
            cta2_text=action_values.cta2_text,
            cta2_link=action_values.cta2_link,
            cta_googleplay=action_values.cta_googleplay,
            cta_appstore=action_values.cta_appstore,
            content_type=contenttype,
        )

    return action


def get_or_create_app_teaser(app_teaser_values):
    try:
        return AppTeaser.objects.get(shelf_id=app_teaser_values.shelf_id)
    except AppTeaser.DoesNotExist:
        contenttype = ContentType.objects.get(app_label='dctcmsbase', model='appteaser')
        expanded_stream_block = ExpandedStreamBlock([('image', ImageBlock())])
        cta_stream_block = StreamBlock([('cta', SimpleCtaLinkBlock())])

        attributes = StreamValue(expanded_stream_block, [
                ('image', StructValue(ImageBlock, [
                    ('image', app_teaser_values.image),
                ])
            )],
        )

        ctas = StreamValue(cta_stream_block, [
                ('cta', StructValue(SimpleCtaLinkBlock, [
                    ('link_text', app_teaser_values.cta_text),
                    ('link_external', app_teaser_values.cta_link),
                    ('link_page', app_teaser_values.cta_page),
                    ('link_id', ''),
                    ('meta_cta_variant', 'button'),
                ])
            )],
        )

        app_teaser = AppTeaser.objects.create(
            shelf_id=app_teaser_values.shelf_id,
            heading=app_teaser_values.heading,
            body=app_teaser_values.body,
            attributes=attributes,
            tracking_group=app_teaser_values.tracking_group,
            content_type=contenttype,
            ctas=ctas,
            cta_googleplay=app_teaser_values.cta_googleplay,
            cta_appstore=app_teaser_values.cta_appstore,
        )
    return app_teaser


def update_banner_panel(panel):
    banner = get_or_create_banner(panel.value)
    
    panel.value = banner

    # panel.value = StructValue(BannerShelf, [
    #     ('panel', banner),
    #     ('meta_layout', 'vertical_left'),
    # ])


    # for item in action_group.value['actions']:
    #     item.value = get_or_create_action(item.value)
    #     item.block = ActionChooserBlock(target_model='oneyou.Action')
    #     items.append((item.block, item.value))

    panel.block = BannerChooserBlock(target_model='dctcmsbase.Banner')
    return panel


def update_banner_shelf(shelf):
    banner = get_or_create_banner(shelf.value)
    
    shelf.value = StructValue(BannerShelf, [
        ('panel', banner),
        ('meta_layout', 'vertical_left'),
    ])

    shelf.block = BannerShelf()
    return shelf


def update_simple_page_heading_shelf(shelf):
    shelf.block = SimplePageHeadingShelf()
    return shelf


def update_promo_shelf(shelf):
    value = shelf.value

    if shelf.value.__class__.__name__ == 'StructValue':
        value = shelf.value['promo']
        del(shelf.value['shelf_id'])
    
    promo = get_or_create_promo(value)

    shelf.value = StructValue(BannerShelf, [
        ('panel', promo),
        ('meta_layout', 'horizontal_left'),
    ])

    shelf.block = BannerShelf()
    return shelf


def update_inline_svg_shelf(shelf):
    shelf.value['shelf_id'] = shelf.value.pop('field_id')
    shelf.block = InlineSvgPanel()
    return shelf


def update_accordion_group_shelf(shelf):
    item_block = StreamBlock([
        ('accordion_panel', AccordionPanel(required=False, icon='form')),
    ])

    panel = update_accordion_panel(shelf)
    # shelf.value['items'] = StreamValue(item_block, [('accordion_panel', panel.value)])
    shelf.value['items'] = StreamValue(item_block, [('accordion_panel', StructValue(AccordionPanel, [
            ('accordions', panel.value['accordions']),
            ('scroll_items_to_top_when_selected', True),
        ])
    )])

    keys_to_remove = ['tracking_group', 'accordions']
    for key in keys_to_remove:
        del(shelf.value[key])

    shelf.block = OneYouGridShelf()
    return shelf


def update_app_teaser_panel(panel):
    app_teaser = get_or_create_app_teaser(panel.value)
    panel.value = StructValue(BannerShelf, [
        ('panel', app_teaser),
    ])
    panel.block = AppTeaserPanel()
    return panel


def update_rich_text_panel(panel):
    panel.block = StandardRichTextPanel()
    return panel


def update_cta_panel(panel):
    panel.value['panel_id'] = panel.value.pop('shelf_id')
    return panel


def update_plain_text_panel(panel):
    panel.block = PlainTextPanel()
    return panel


def update_simple_image_panel(panel):
    (rendition_mobile, rendition_desktop) = get_renditions(panel.value['image_meta'])

    panel.value['image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', panel.value['image']),
            ('meta_mobile_rendition', rendition_mobile if panel.value['mobile_use_renditions'] else 'none'),
            ('meta_desktop_rendition', rendition_desktop if panel.value['desktop_use_renditions'] else 'none'),
        ]
    )

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions']
    for key in keys_to_remove:
        del(panel.value[key])

    panel.block = StandardSimpleImagePanel()
    return panel


def update_accordion_items_panel(panel):
    accordion_items_block = StreamBlock([('rich_text_panel', StandardRichTextPanel(required=False))])

    items = []
    for item in panel.value['items']:
        if item.block_type in panels_name_conversion.keys():
            block_type = panels_name_conversion[item.block_type]
        else:
            block_type = item.block_type if item.block_type.endswith('_panel') else '{}_panel'.format(item.block_type)
        item = globals()['update_{}'.format(block_type)](item)
        item.block.name = block_type
        items.append((block_type, item.value))
    
    panel.value['items'] = StreamValue(accordion_items_block, items)

    panel.value['panel_id'] = panel.value.pop('shelf_id')

    panel.block = AccordionItemsPanel()
    return panel


def update_accordion_panel(panel):
    accordion_block = StreamBlock([('accordion_items_panel', AccordionItemsPanel(required=True, icon='collapse-down'))])
    rich_text_block = StreamBlock([('rich_text_panel', StandardRichTextPanel(required=False))])
    accordion_item_panel = []
    for item in panel.value['accordions']:
        items = []
        for text in item.value['items']:
            items.append(('rich_text_panel', StructValue(StandardRichTextPanel, [
                    ('text', text.value['text']),
                    ('meta_variant', text.value['meta_variant']),
                ])
            ))
        accordion_item_panel.append(('accordion_items_panel', StructValue(AccordionItemsPanel, [
                ('heading', item.value['heading']),
                ('items', StreamValue(rich_text_block, items)),
            ])
        ))
    
    panel.value['accordions'] = StreamValue(accordion_block, accordion_item_panel)

    return panel


def update_information_panel(panel):
    (rendition_mobile, rendition_desktop) = get_renditions(panel.value['image_meta'])

    panel.value['image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', panel.value['image']),
            ('meta_mobile_rendition', rendition_mobile if panel.value['mobile_use_renditions'] else 'none'),
            ('meta_desktop_rendition', rendition_desktop if panel.value['desktop_use_renditions'] else 'none'),
        ]
    )

    panel.value['meta_layout'] = 'desktop-image-left-mobile-image-top'

    if panel.value['meta_variant'] not in ['light_background', 'dark_background']:
        variant = {
            'mobile-image-top-text-right': 'desktop-image-left-mobile-image-top',
            'mobile-image-right': 'desktop-image-right-mobile-image-right',
        }
        panel.value['meta_layout'] = variant[panel.value['meta_variant']]
        panel.value['meta_variant'] = 'light_background'

    cta_stream_block = StreamBlock([('simple_menu_item', SimpleCtaLinkBlock())])

    ctas = []
    for item in panel.value['cta']:
        ctas.append(('simple_menu_item', StructValue(SimpleCtaLinkBlock, [
                ('link_text', item.value['link_text']),
                ('link_external', item.value['link_external']),
                ('link_page', item.value['link_page']),
                ('link_id', item.value['link_id']),
                ('meta_cta_variant', 'button'),
            ])
        ))
    
    panel.value['ctas'] = StreamValue(cta_stream_block, ctas)

    panel.value['panel_id'] = panel.value.pop('shelf_id')

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions', 'cta']
    for key in keys_to_remove:
        del(panel.value[key])

    panel.block = StandardInformationPanel()
    return panel


def update_video_teaser_panel(panel):
    (rendition_mobile, rendition_desktop) = get_renditions(panel.value['image_meta'])

    panel.value['image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', panel.value['image']),
            ('meta_mobile_rendition', rendition_mobile if panel.value['mobile_use_renditions'] else 'none'),
            ('meta_desktop_rendition', rendition_desktop if panel.value['desktop_use_renditions'] else 'none'),
        ]
    )

    for item in panel.value['cta']:
        item.block = SimpleCtaLinkBlock()
        item.block.name = 'simple_cta_link'
    
    panel.value['ctas'] = panel.value.pop('cta')

    panel.value['meta_layout'] = '{}-{}'.format(panel.value['meta_layout_desktop'], panel.value['meta_layout_mobile'])

    panel.value['panel_id'] = panel.value.pop('shelf_id')

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions', 'meta_layout_mobile', 'meta_layout_desktop']
    for key in keys_to_remove:
        del(panel.value[key])

    panel.block = StandardVideoTeaserPanel()
    return panel


def update_inline_script_panel(panel):
    panel.value['panel_id'] = panel.value.pop('field_id')
    panel.block = InlineScriptPanel()
    return panel


def update_list_item_panel(panel):
    return panel


def update_icon_card_panel(panel):
    (rendition_mobile, rendition_desktop) = get_renditions(panel.value['image_meta'])

    panel.value['image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', panel.value['image']),
            ('meta_mobile_rendition', rendition_mobile if panel.value['mobile_use_renditions'] else 'none'),
            ('meta_desktop_rendition', rendition_desktop if panel.value['desktop_use_renditions'] else 'none'),
        ]
    )

    for item in panel.value['cta']:
        item.block = SimpleCtaLinkBlock()
        item.block.name = 'simple_cta_link'
    
    panel.value['ctas'] = panel.value.pop('cta')

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions']
    for key in keys_to_remove:
        del(panel.value[key])

    panel.block = IconCardPanel()
    return panel


def update_oneyou_teaser_panel(panel):
    (rendition_mobile, rendition_desktop) = get_renditions(panel.value['image_meta'])

    panel.value['image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', panel.value['image']),
            ('meta_mobile_rendition', rendition_mobile if panel.value['mobile_use_renditions'] else 'none'),
            ('meta_desktop_rendition', rendition_desktop if panel.value['desktop_use_renditions'] else 'none'),
        ]
    )

    cta_stream_block = StreamBlock([('simple_menu_item', SimpleCtaLinkBlock())])

    ctas = []
    for item in panel.value['cta']:
        ctas.append(('simple_menu_item', StructValue(SimpleCtaLinkBlock, [
                ('link_text', item.value['link_text']),
                ('link_external', item.value['link_external']),
                ('link_page', item.value['link_page']),
                ('link_id', item.value['link_id']),
                ('meta_cta_variant', 'link'),
            ])
        ))
    
    panel.value['ctas'] = StreamValue(cta_stream_block, ctas)

    panel.value['panel_id'] = panel.value.pop('shelf_id')

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions', 'cta']
    for key in keys_to_remove:
        del(panel.value[key])

    panel.block = BackwardsCompatibleContentPanel()
    return panel


def update_inline_svg_panel(panel):
    panel.value['panel_id'] = panel.value.pop('field_id')
    panel.block = InlineSvgPanel()
    return panel


def update_image_teaser_panel(panel):
    (rendition_mobile, rendition_desktop) = get_renditions(panel.value['image_meta'])

    panel.value['image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', panel.value['image']),
            ('meta_mobile_rendition', rendition_mobile if panel.value['mobile_use_renditions'] else 'none'),
            ('meta_desktop_rendition', rendition_desktop if panel.value['desktop_use_renditions'] else 'none'),
        ]
    )

    for item in panel.value['cta']:
        if 'link_external' in item.value:
            item.block = SimpleCtaLinkBlock()
            item.block.name = 'simple_cta_link'
        else:
            item.block = DocumentDownloadBlock()
            item.block.name = 'document_download'
    
    panel.value['ctas'] = panel.value.pop('cta')

    panel.value['meta_layout'] = '{}-{}'.format(panel.value['meta_layout_desktop'], panel.value['meta_layout_mobile'])

    panel.value['panel_id'] = panel.value.pop('shelf_id')

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions', 'meta_layout_mobile', 'meta_layout_desktop', 'audio', 'meta_cta_variant']
    for key in keys_to_remove:
        del(panel.value[key])

    panel.block = StandardImageTeaserPanel()
    return panel


def update_svg_shelf(shelf):
    shelf.value['shelf_id'] = shelf.value.pop('field_id')
    shelf.block = InlineSvgShelf()
    return shelf


def update_carousel_shelf(shelf):
    item_block = StreamBlock([
        ('video_teaser_panel', StandardVideoTeaserPanel(icon='media')),
        ('image_teaser_panel', StandardImageTeaserPanel(icon='pick')),
        ('cta_panel', CtaPanel(icon='plus')),
        ('banner_panel', BannerChooserBlock(target_model='dctcmsbase.Banner', icon='image')),
        ('app_teaser_panel', AppTeaserChooserBlock(target_model='dctcmsbase.AppTeaser', icon='image')),
    ])

    items = []
    for item in shelf.value['items']:
        if item.block_type in panels_name_conversion.keys():
            block_type = panels_name_conversion[item.block_type]
        else:
            block_type = item.block_type if item.block_type.endswith('_panel') else '{}_panel'.format(item.block_type)
        item = globals()['update_{}'.format(block_type)](item)
        item.block.name = block_type
        items.append((block_type, item.value))

    shelf.value['items'] = StreamValue(item_block, items)

    shelf.block = CarouselShelf()
    return shelf


def update_iframe_shelf(shelf):
    return shelf


def update_action_plan_shelf(shelf):

    action_groups_block = StreamBlock([
        ('action_group', ActionGroupPanel(required=False, icon='collapse-down')),
    ])
    action_plan_block = StreamBlock([
        ('action_panel', ActionChooserBlock(target_model='oneyou.Action', icon='list-ul')),
    ])

    action_group_items = []
    for action_group in shelf.value['action_groups']:
        items = []
        for item in action_group.value['actions']:
            item.value = get_or_create_action(item.value)
            item.block = ActionChooserBlock(target_model='oneyou.Action')
            items.append(('action_panel', item.value))
        action_group_items.append(('action_group', StructValue(ActionGroupPanel, [
                ('title', action_group.value['title']),
                ('actions', StreamValue(action_plan_block, items)),
            ])
        ))

    shelf.value['action_groups'] = StreamValue(action_groups_block, action_group_items)

    cta_stream_block = StreamBlock([('simple_menu_item', SimpleCtaLinkBlock())])

    ctas = []
    for item in shelf.value['cta']:
        ctas.append(('simple_menu_item', StructValue(SimpleCtaLinkBlock, [
                ('link_text', item.value['link_text']),
                ('link_external', item.value['link_external']),
                ('link_page', item.value['link_page']),
                ('link_id', item.value['link_id']),
                ('meta_cta_variant', 'button'),
            ])
        ))
    
    shelf.value['ctas'] = StreamValue(cta_stream_block, ctas)

    del(shelf.value['cta'])

    shelf.block = ActionPlanShelf()

    return shelf


def update_action_plan_display_shelf(shelf):
    for item in shelf.value['cta']:
        item.block = SimpleCtaLinkBlock()
        item.block.name = 'simple_cta_link'
    
    shelf.value['ctas'] = shelf.value.pop('cta')

    shelf.block = ActionPlanDisplayShelf()

    return shelf


def update_section_heading_shelf(shelf):
    shelf.block = OneYouSectionHeadingShelf()
    return shelf


def update_find_out_more_dropdown_shelf(shelf):
    for item in shelf.value['cta']:
        item.block = SimpleCtaLinkBlock()
        item.block.name = 'simple_cta_link'
    
    shelf.value['ctas'] = shelf.value.pop('cta')

    keys_to_remove = ['image_meta', 'mobile_use_renditions', 'desktop_use_renditions']
    for key in keys_to_remove:
        del(shelf.value[key])

    shelf.block = FindOutMoreDropDownShelf()
    return shelf


def update_two_column_shelf(shelf):
    item_block = StreamBlock([
        ('rich_text_panel', StandardRichTextPanel(icon='title')),
        ('information_panel', StandardInformationPanel(target_model='shelves.AppTeaser', icon='image')),
        ('cta_panel', CtaPanel(icon='plus')),
        ('image_teaser_panel', StandardImageTeaserPanel(icon='pick')),
        ('video_teaser_panel', StandardVideoTeaserPanel(icon='pick')),
        ('plain_text_panel', PlainTextPanel(required=False)),
        ('simple_image_panel', StandardSimpleImagePanel(icon='image')),
        ('accordion_panel', AccordionPanel(required=False, icon='form')),
        ('inline_script_panel', InlineScriptPanel(icon='code')),
        ('inline_svg_panel', InlineSvgPanel(icon='snippet')),
        ('app_teaser_panel', AppTeaserPanel(target_model='shelves.AppTeaser', icon='image')),
        ('oneyou_teaser_panel', BackwardsCompatibleContentPanel(label='OneYou1 teaser', icon='folder-inverse')),
    ])

    for column_item in ['column_1_items', 'column_2_items']:
        items = []
        for item in shelf.value[column_item]:
            if item.block_type in panels_name_conversion.keys():
                block_type = panels_name_conversion[item.block_type]
            else:
                block_type = item.block_type if item.block_type.endswith('_panel') else '{}_panel'.format(item.block_type)
            item = globals()['update_{}'.format(block_type)](item)
            item.block.name = block_type
            items.append((block_type, item.value))

        shelf.value[column_item] = StreamValue(item_block, items)

    keys_to_remove = ['meta_image_display']
    for key in keys_to_remove:
        del(shelf.value[key])

    shelf.block = OneYouTwoColumnShelf()
    return shelf


def update_grid_shelf(shelf):
    shelf.value['background_image'] = StructValue(BackgroundImageBlock, 
        [
            ('image', shelf.value['background_image']['image']),
            ('meta_variant', 'none'),
            ('meta_mobile_rendition', 'none'),
            ('meta_desktop_rendition', 'none'),
            ('meta_image_display', shelf.value['meta_image_display']),
        ]
    )

    item_block = StreamBlock([
        ('rich_text_panel', StandardRichTextPanel(icon='title')),
        ('information_panel', StandardInformationPanel(target_model='shelves.AppTeaser', icon='image')),
        ('cta_panel', CtaPanel(icon='plus')),
        ('icon_card_panel', IconCardPanel(icon='snippet')),
        ('image_teaser_panel', StandardImageTeaserPanel(icon='pick')),
        ('video_teaser_panel', StandardVideoTeaserPanel(icon='pick')),
        ('plain_text_panel', PlainTextPanel(required=False)),
        ('simple_image_panel', StandardSimpleImagePanel(icon='image')),
        ('accordion_panel', AccordionPanel(required=False, icon='form')),
        ('inline_script_panel', InlineScriptPanel(icon='code')),
        ('inline_svg_panel', InlineSvgPanel(icon='snippet')),
        ('app_teaser_panel', AppTeaserPanel(target_model='shelves.AppTeaser', icon='image')),
        ('oneyou_teaser_panel', BackwardsCompatibleContentPanel(label='OneYou1 teaser', icon='folder-inverse')),
        ('list_item_panel', ListItemPanel(icon='list-ul')),
        ('action_plan_shelf', ActionPlanShelf(label='Action Plan Builder shelf', icon='form')),
        ('action_plan_display_shelf', ActionPlanDisplayShelf(label='Action Plan Display shelf', icon='form')),
    ])

    items = []
    for item in shelf.value['items']:
        if item.block_type in panels_name_conversion.keys():
            block_type = panels_name_conversion[item.block_type]
        else:
            block_type = item.block_type if item.block_type.endswith('_panel') else '{}_panel'.format(item.block_type)
        item = globals()['update_{}'.format(block_type)](item)
        item.block.name = block_type
        items.append((block_type, item.value))

    shelf.value['items'] = StreamValue(item_block, items)

    keys_to_remove = ['meta_image_display']
    for key in keys_to_remove:
        del(shelf.value[key])

    shelf.block = OneYouGridShelf()
    return shelf


@user_passes_test(user_has_any_page_permission)
def copy_oneyou_newworld(request, page_id):
    articlepage_slug = [
        '10-top-tips-to-move-more',
        '5-tips-to-help-you-quit-smoking' ,
        '9-stop-smoking-aids-that-can-help-you-quit',
        'using-e-cigarettes-vapes-to-quit-smoking',
        'support-tools-for-quitting-smoking',
        'what-happens-when-you-quit-smoking',
        'expert-face-to-face-support',
        'how-to-avoid-a-hangover',
        'know-your-alcohol-units',
        'darens-story',
        'tims-story',
        'terris-story',
    ]
    is_article = False
    oneyou2page = OneYou2Page.objects.get(id=page_id)
    data = model_to_dict(oneyou2page, exclude=['id', 'numchild', 'page_ptr', 'opt_in_1_text', 'opt_in_2_text', 'ts_and_cs_statement'])

    if data['slug'] in articlepage_slug:
        is_article = True

    # Update Content Type
    contenttype = None
    if is_article:
        contenttype = ContentType.objects.get(app_label='oneyou', model='articleoneyoupage')
    else:
        contenttype = ContentType.objects.get(app_label='oneyou', model='oneyoupage')
    data['content_type'] = contenttype

    # update images
    if data['og_image_fk'] is not None:
        og_image_fk = PHEImage.objects.get(id=data['og_image_fk'])
        data['og_image_fk'] = og_image_fk
    if data['twitter_image_fk'] is not None:
        twitter_image_fk = PHEImage.objects.get(id=data['twitter_image_fk'])
        data['twitter_image_fk'] = twitter_image_fk

    # update Theme
    theme = Theme.objects.get(id=data['theme'])
    data['theme'] = theme

    # Update owner
    owner = User.objects.get(id=9)
    if data['owner'] is not None:
        owner = User.objects.get(id=data['owner'])
    data['owner'] = owner

    # Update slug and path
    data['title'] += ' (new)'
    data['slug'] += '-new' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    data['path'] = get_new_path(data['path'])

    for shelf in data['body']:
        if shelf.block_type in shelves_name_conversion.keys():
            block_type = shelves_name_conversion[shelf.block_type]
        else:
            block_type = shelf.block_type if shelf.block_type.endswith('_shelf') else '{}_shelf'.format(shelf.block_type)
        shelf = globals()['update_{}'.format(block_type)](shelf)
        if block_type == 'accordion_group_shelf':
            shelf.block.name = 'grid_shelf'
        elif block_type == 'promo_shelf':
            shelf.block.name = 'banner_shelf'
        else:
            shelf.block.name = block_type

    oneyou = None
    if is_article:
        oneyou = ArticleOneYouPage.objects.create(**data)
    else:
        oneyou = OneYouPage.objects.create(**data)

    parent_page = oneyou.get_parent()
    parent_page.numchild += 1
    parent_page.save()

    return redirect('/admin/pages/{}/'.format(parent_page.id))