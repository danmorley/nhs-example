
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

    ('blurb', None, None, {'desktop': '1366x591', 'mobile': '375x162'}),
]


MOBILE_RENDITION_CHOICES = (
    ('none', 'Use Original'),
    ('107x176', '107 x 176'),
    ('107x370', '107 x 370'),
    ('120x120', '120 x 120'),
    ('121x176', '121 x 176'),
    ('121x326', '121 x 326'),
    ('132x176', '132 x 176'),
    ('132x334', '132 x 334'),
    ('138x176', '138 x 176'),
    ('158x145', '158 x 145'),
    ('173x176', '173 x 176'),
    ('188x176', '188 x 176'),
    ('305x120', '305 x 120'),
    ('345x160', '345 x 160'),
    ('375x143', '375 x 143'),
    ('375x162', '375 x 162 Sexhealth Page Header Background'),
    ('375x256', '375 x 256'),
    ('375x307', '375 x 307'),
)

DESKTOP_RENDITION_CHOICES = (
    ('none', 'Use Original'),
    ('1150x220', '1150x220'),
    ('128x263', '128x263'),
    ('128x378', '128x378'),
    ('1440x240', '1440x240'),
    ('1440x309', '1440x309'),
    ('1440x366', '1440x366'),
    ('1366x591', '1366x591 Sexhealth Page Header Background'),
    ('1440x800', '1440x800'),
    ('146x336', '146x336'),
    ('182x378', '182x378'),
    ('196x263', '196x263'),
    ('196x289', '196x289'),
    ('200x200', '200x200'),
    ('224x336', '224x336'),
    ('258x220', '258x220'),
    ('280x289', '280x289'),
    ('287x263', '287x263'),
    ('364x220', '364x220'),
    ('403x263', '403x263'),
    ('410x263', '410x263'),
    ('460x336', '460x336'),
    ('504x263', '504x263'),
    ('560x220', '560x220'),
    ('575x263', '575x263'),
    ('650x450', '650x450'),
    ('720x263', '720x263'),
)