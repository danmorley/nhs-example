from dctcmsbase.shelves import GridShelf, WithTracking, GRID_VARIANT_CHOICES, GRID_LAYOUT_CHOICES

SEXHEALTH_GRID_PANELS = ()

class SexHealthGridShelf(GridShelf, WithTracking):
    items = blocks.StreamBlock(SEXHEALTH_GRID_PANELS, icon='arrow-left', label='Items')
    meta_variant = blocks.ChoiceBlock(choices=GRID_VARIANT_CHOICES,
                                    default='standard',
                                    label='Variant',
                                    classname='dct-meta-field')
    meta_layout = blocks.ChoiceBlock(choices=GRID_LAYOUT_CHOICES,
                                     default='full_width',
                                     label='Layout',
                                     help_text='Use this to select number of columns on desktop (only one column'
                                               ' on mobile)', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-grid-shelf dct-meta-panel'