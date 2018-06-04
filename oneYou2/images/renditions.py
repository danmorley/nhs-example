
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
    ('information_panel', 'grid_shelf', '2_col_1_on_mobile', {'desktop': '224x336', 'mobile': '138x176'}),
    ('information_panel', 'grid_shelf', '3_col_1_on_mobile', {'desktop': '146x336', 'mobile': '138x176'}),

    ('recipe_teaser', 'recipe_grid_shelf', None, {'desktop': '258x220', 'mobile': '158x145'}),
]
