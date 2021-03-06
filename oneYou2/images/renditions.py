ONEYOU_ID = 'oneyou'
SEXHEALTH_ID = 'sexhealth'

RENTIDTION_SITES = (
    ('base', 'Base'),
    ('all', 'All'),
    (ONEYOU_ID, 'One You'),
    (SEXHEALTH_ID, 'Sexual Health'),
)

MOBILE_RENDITION_CHOICES = (
    ('none', 'Use Original'),
)

DESKTOP_RENDITION_CHOICES = (
    ('none', 'Use Original'),
)

MOBILE_RENDITION_CHOICES_PER_SITE = {
    ONEYOU_ID: [
        ['107x176', '107 x 176'],
        ['107x370', '107 x 370'],
        ['120x120', '120 x 120'],
        ['121x176', '121 x 176'],
        ['121x326', '121 x 326'],
        ['132x176', '132 x 176'],
        ['132x334', '132 x 334'],
        ['138x176', '138 x 176'],
        ['158x145', '158 x 145'],
        ['173x176', '173 x 176'],
        ['188x176', '188 x 176'],
        ['305x120', '305 x 120'],
        ['345x160', '345 x 160'],
        ['375x143', '375 x 143'],
        ['375x256', '375 x 256'],
        ['375x307', '375 x 307'],
    ],
    SEXHEALTH_ID: [
        ['360x180', '360 x 180 Teaser'],
        ['136x117', '136 x 117 Information'],
        ['320x540', '320 x 540 Home page header'],
        ['375x200', '375 x 200 Page header, banner/promo background'],
    ],
}

DESKTOP_RENDITION_CHOICES_PER_SITE = {
    ONEYOU_ID: [
        ['128x263', '128 x 263'],
        ['128x378', '128 x 378'],
        ['146x336', '146 x 336'],
        ['182x378', '182 x 378'],
        ['196x263', '196 x 263'],
        ['196x289', '196 x 289'],
        ['200x200', '200 x 200'],
        ['224x336', '224 x 336'],
        ['258x220', '258 x 220'],
        ['280x289', '280 x 289'],
        ['287x263', '287 x 263'],
        ['364x220', '364 x 220'],
        ['403x263', '403 x 263'],
        ['410x263', '410 x 263'],
        ['460x336', '460 x 336'],
        ['504x263', '504 x 263'],
        ['560x220', '560 x 220'],
        ['575x263', '575 x 263'],
        ['650x450', '650 x 450'],
        ['720x263', '720 x 263'],
        ['1440x240', '1440 x 240'],
        ['1440x309', '1440 x 309'],
        ['1440x800', '1440 x 800'],
        ['1150x220', '1150 x 220'],
    ],
    SEXHEALTH_ID: [
        ['180x360', '180 x 360 Teaser'],
        ['408x351', '408 x 351 Information'],
        ['1366x591', '1366 x 591 Home page header background'],
        ['1440x366', '1440 x 366 Page header, banner/promo background'],
    ],
}

for SITE_ID, RENDITION_CHOICES in MOBILE_RENDITION_CHOICES_PER_SITE.items():
    MOBILE_RENDITION_CHOICES += tuple([(RENDITION_CHOICE[0], RENDITION_CHOICE[1] + ' [[{}]]'.format(SITE_ID)) for RENDITION_CHOICE in RENDITION_CHOICES])

for SITE_ID, RENDITION_CHOICES in DESKTOP_RENDITION_CHOICES_PER_SITE.items():
    DESKTOP_RENDITION_CHOICES += tuple([(RENDITION_CHOICE[0], RENDITION_CHOICE[1] + ' [[{}]]'.format(SITE_ID)) for RENDITION_CHOICE in RENDITION_CHOICES])

# Legacy oneyou old world rendition
ONEYOU_RENDITIONS = [
    # shelf type, parent, parent_layout, size
    ('page_heading_shelf', None, None, {'desktop': '1440x240', 'mobile': '375x143'}),

    ('banner_shelf', None, None,  {'desktop': '1440x309', 'mobile': '375x256'}),
    ('banner_shelf', 'carousel_shelf', None,  {'desktop': '1440x366', 'mobile': '375x307'}),

    ('video_teaser', 'carousel_shelf', None,  {'desktop': '504x263', 'mobile': '132x176'}),
    ('video_teaser', 'panel_carousel_shelf', None,  {'desktop': '287x263', 'mobile': '107x176'}),
    ('video_teaser', 'grid_shelf', 'full_width',  {'desktop': '403x263', 'mobile': '121x176'}),
    ('video_teaser', 'grid_shelf', '2_col_1_on_mobile',  {'desktop': '196x263', 'mobile': '121x176'}),
    ('video_teaser', 'grid_shelf', '3_col_1_on_mobile',  {'desktop': '128x263', 'mobile': '121x176'}),

    ('app_teaser', 'carousel_shelf', None,  {'desktop': '504x263', 'mobile': '132x334'}),
    ('app_teaser', 'panel_carousel_shelf', None,  {'desktop': '287x263', 'mobile': '107x370'}),
    ('app_teaser', 'grid_shelf', 'full_width',  {'desktop': '403x263', 'mobile': '121x326'}),
    ('app_teaser', 'grid_shelf', '2_col_1_on_mobile',  {'desktop': '196x289', 'mobile': '121x326'}),
    ('app_teaser', 'grid_shelf', '3_col_1_on_mobile',  {'desktop': '128x378', 'mobile': '121x326'}),

    ('image_teaser', 'carousel_shelf', None,  {'desktop': '720x263', 'mobile': '188x176'}),
    ('image_teaser', 'panel_carousel_shelf', None,  {'desktop': '410x263', 'mobile': '305x120'}),
    ('image_teaser', 'grid_shelf', 'full_width',  {'desktop': '575x263', 'mobile': '173x176'}),
    ('image_teaser', 'grid_shelf', '2_col_1_on_mobile',  {'desktop': '280x289', 'mobile': '173x176'}),
    ('image_teaser', 'grid_shelf', '3_col_1_on_mobile',  {'desktop': '182x378', 'mobile': '173x176'}),

    ('oneyou1_teaser', 'grid_shelf', 'full_width',  {'desktop': '1150x220', 'mobile': '345x160'}),
    ('oneyou1_teaser', 'grid_shelf', '2_col_1_on_mobile',  {'desktop': '560x220', 'mobile': '345x160'}),
    ('oneyou1_teaser', 'grid_shelf', '3_col_1_on_mobile',  {'desktop': '364x220', 'mobile': '345x160'}),

    ('information_panel', 'grid_shelf', 'full_width', {'desktop': '460x336', 'mobile': '138x176'}),
    ('information_panel', 'grid_shelf', 'article_full_width', {'desktop': '650x450', 'mobile': '345x160'}),
    ('information_panel', 'grid_shelf', '2_col_1_on_mobile', {'desktop': '224x336', 'mobile': '138x176'}),
    ('information_panel', 'grid_shelf', '3_col_1_on_mobile', {'desktop': '146x336', 'mobile': '138x176'}),

    ('recipe_teaser', 'recipe_grid_shelf', None, {'desktop': '258x220', 'mobile': '158x145'}),

    ('icon_card_panel', 'grid_shelf', 'full_width', {'desktop': '200x200', 'mobile': '120x120'}),
    ('icon_card_panel', 'grid_shelf', '2_col_1_on_mobile', {'desktop': '200x200', 'mobile': '120x120'}),
    ('icon_card_panel', 'grid_shelf', '3_col_1_on_mobile', {'desktop': '200x200', 'mobile': '120x120'}),

    ('grid_shelf', None, None, {'desktop': '1440x800', 'mobile': '375x143'}),
    ('icon_card_panel', 'two_column_shelf', None, {'desktop': '200x200', 'mobile': '120x120'}),

    ('sexhealth_home_page_header', None, None, {'desktop': '1366x591', 'mobile': '320x540'}),
    ('sexhealth_page_header', None, None, {'desktop': '1440x366', 'mobile': '375x200'}),
    ('sexhealth_teaser', None, None, {'desktop': '180x360', 'mobile': '360x180'}),
    ('sexhealth_information', None, None, {'desktop': '408x351', 'mobile': '136x117'}),
]