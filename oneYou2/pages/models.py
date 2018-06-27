import json
import logging

from django.db import models
from django.db.models import DateField, TextField
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.template.response import TemplateResponse, SimpleTemplateResponse

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import StreamField, RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel, InlinePanel, ObjectList, TabbedInterface, \
    MultiFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel
from wagtail.wagtailsnippets.models import register_snippet
from wagtailsnippetscopy.models import SnippetCopyMixin
from wagtailsnippetscopy.registry import snippet_copy_registry

from modelcluster.models import get_all_child_relations, get_all_child_m2m_relations
from modelcluster.fields import ParentalKey

from .blocks import IDBlock, CTABlock, MenuItemPageBlock
from .utils import get_serializable_data_for_fields
from home.models import SiteSettings
from shelves.blocks import PromoShelfChooserBlock, BannerShelfChooserBlock, AppTeaserChooserBlock, \
    BlobImageChooserBlock, RecipeTeaserChooserBlock


GRID_VARIANT_CHOICES = (
    ('standard', 'Standard'),
    ('grey_background', 'Grey Background'),
)

GRID_LAYOUT_CHOICES = (
    ('full_width', 'Full Width'),
    ('2_col_1_on_mobile', 'Responsive (2 columns on desktop)'),
    ('3_col_1_on_mobile', 'Responsive (3 columns on desktop)'),
)

GRID_IMAGE_CHOICES = (
    ('contain', 'Contain'),
    ('cover', 'Stretch'),
)

TABLE_VARIANTS = (
    ('standard', 'Standard'),
)

ICON_CARD_LAYOUTS = (
    ('icon_on_left', 'Icon on Left'),
    ('icon_on_right', 'Icon on Right'),
    ('icon_heading_left', 'Icon Heading Left'),
    ('icon_body_right', 'Icon Body Right'),
)

ICON_CARD_VARIANTS = (
    ('standard_grey_bg', 'Standard on Grey Background'),
    ('standard_heading_standard_body_grey_bg', 'Standard Heading, Standard Body Text, Grey Background'),
    ('large_green_heading_standard_body_grey_bg', 'Large Green Heading, Standard Body Text, Grey Background'),
    ('x_small_heading_large_body_no_bg', 'X Small Heading, Large Body Text, No Background'),
)

CONTENT_STATUS_PENDING = 0

logger = logging.getLogger('wagtail.core')


class SimpleMenuItem(blocks.StructBlock):
    link_text = blocks.CharBlock(required=False)
    link_external = blocks.CharBlock(label='External link', required=False)
    link_page = MenuItemPageBlock(required=False)


class MultiMenuItem(blocks.StructBlock):
    label = blocks.CharBlock(required=False)
    menu_items = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items')


class SocialMediaFooterLink(blocks.StructBlock):
    choices = (
        ('twitter', "Twitter"),
        ('facebook', "Facebook"),
    )
    label = blocks.CharBlock(required=False)
    type = blocks.ChoiceBlock(choices=choices)
    link = blocks.URLBlock(label='External link', required=False)


# Panels

class PageHeading(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    background_image = BlobImageChooserBlock(required=False)
    shelf_id = IDBlock(required=False,
                       label="ID",
                       help_text="Not displayed in the front end",
                       classname='dct-meta-field')
    meta_gradient = blocks.BooleanBlock(label='Green gradient',
                                        required=False,
                                        default=False,
                                        classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-page-heading-panel dct-meta-panel'


class BackwardsCompatibleContent(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock()
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False, verbose_name="cta")
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-oneyou2-teaser-panel dct-meta-panel'


class InformationPanel(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False, verbose_name="cta")
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-information-panel dct-meta-panel'


class FindOutMoreDropDown(CTABlock):
    heading = blocks.CharBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items')
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-find-out-more-panel dct-meta-panel'


class VideoTemplate(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock(help_text="Click this image plays the video")
    video = blocks.CharBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-video-teaser-panel dct-meta-panel'


class ImageTeaserTemplate(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock()
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=[
            ('light-bg', 'Light Background'),
            ('dark-bg', 'Dark Background')
        ],
        label='Variant', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-panel-image-teaser dct-meta-panel'


class IconCardPanel(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock(required=False)
    panel_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=ICON_CARD_VARIANTS, label="Variant", classname='dct-meta-field')
    meta_layout = blocks.ChoiceBlock(choices=ICON_CARD_LAYOUTS, label="Layout", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-icon-card-panel dct-meta-panel'


class SimpleTextPanel(blocks.StructBlock):
    text = blocks.CharBlock(required=False)


class RichTextPanel(blocks.StructBlock):
    text = blocks.RichTextBlock(required=False)


class InlineScriptPanel(blocks.StructBlock):
    script = blocks.TextBlock(required=False, help_text="The javascript to be inserted")
    src = blocks.CharBlock(required=False, help_text="URL of the javascript file")
    field_id = IDBlock(required=False, label="Placeholder ID", retain_case=True)

    class Meta:
        form_classname = 'dct-inline-script-panel'


GRID_PANELS = [
    ('oneyou1_teaser', BackwardsCompatibleContent(label="OneYou1 teaser", icon="folder-inverse")),
    ('video_teaser', VideoTemplate(icon="media")),
    ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
    ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
    ('information_panel', InformationPanel(target_model="shelves.AppTeaser", icon="image")),
    ('icon_card_panel', IconCardPanel(icon="snippet")),
    ('inline_script_panel', InlineScriptPanel(icon="code"))
]


# Shelves

class SectionHeading(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    shelf_id = IDBlock(required=False,
                       label="ID",
                       help_text="Not displayed in the front end",
                       classname='dct-meta-field')
    body = blocks.RichTextBlock(required=False)

    class Meta:
        form_classname = 'dct-section-heading-shelf dct-meta-panel'


class SimplePageHeading(SectionHeading):
    """This is a page heading with only text."""
    pass


class ArticlePageHeadingShelf(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    display_back_button = blocks.BooleanBlock(label='Display a back button', required=False, default=True)
    back_button_label = blocks.CharBlock(required=False)


class IFrameShelf(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    src = blocks.CharBlock(required=True, label="Source URl")
    frame_border = blocks.IntegerBlock(default=0, required=False)
    scrolling = blocks.CharBlock(required=False)
    width = blocks.IntegerBlock(default=100, required=False)
    height = blocks.IntegerBlock(default=100, required=False)
    sandbox = blocks.CharBlock(required=False)
    shelf_id = blocks.CharBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-iframe-shelf dct-meta-panel'


class Divider(blocks.StructBlock):
    shelf_id = IDBlock(required=False, label="ID", help_text="Not displayed in the front end")


class Carousel(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('video_teaser', VideoTemplate(icon="media")),
        ('banner_shelf', BannerShelfChooserBlock(target_model="shelves.BannerShelf", icon="image")),
        ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
        ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-carousel-shelf dct-meta-panel'


class PanelCarousel(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('video_teaser', VideoTemplate(icon="media")),
        ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
        ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-panel-carousel-shelf dct-meta-panel'


class Grid(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock(GRID_PANELS, icon='arrow-left', label='Items')
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    rows_to_show = blocks.IntegerBlock(default=0, classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=GRID_VARIANT_CHOICES, label="Variant", classname='dct-meta-field')
    meta_layout = blocks.ChoiceBlock(choices=GRID_LAYOUT_CHOICES,
                                     label="Layout",
                                     help_text="Use this to select number of columns on desktop (only one column"
                                               " on mobile)", classname='dct-meta-field')
    meta_image_display = blocks.ChoiceBlock(GRID_IMAGE_CHOICES,
                                            label='Teaser Image Display',
                                            default="cover",
                                            classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-grid-shelf dct-meta-panel'


class RecipeGrid(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('recipe_teaser', RecipeTeaserChooserBlock(target_model="shelves.RecipeTeaser", icon="image"))
    ], icon='arrow-left', label='Items')
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    rows_to_show = blocks.IntegerBlock(default=0, classname='dct-meta-field')
    meta_image_display = blocks.ChoiceBlock(GRID_IMAGE_CHOICES,
                                            label='Teaser Image Display',
                                            default="cover", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-recipe-grid-shelf dct-meta-panel'


class Table(blocks.StructBlock):
    header = blocks.ListBlock(blocks.CharBlock(required=False), label='Column headings')
    display_header = blocks.BooleanBlock(label='Display the table header?',
                                         required=False)
    body_rows = blocks.ListBlock(blocks.StreamBlock([
        ('simple_text_panel', SimpleTextPanel(required=False)),
        ('rich_text_panel', RichTextPanel(required=False)),
        ('icon_card_panel', IconCardPanel(required=False, icon="snippet"))
    ]))
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=TABLE_VARIANTS, label="Variant", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-table-shelf dct-meta-panel'


# Pages

class OneYou2Page(Page):
    body = StreamField([
        ('page_heading_shelf', PageHeading(icon='title')),
        ('simple_page_heading_shelf', SimplePageHeading(icon='title')),
        ('section_heading_shelf', SectionHeading(classname="full title", icon='title')),
        ('carousel_shelf', Carousel(icon="repeat")),
        ('panel_carousel_shelf', PanelCarousel(icon="repeat")),
        ('promo_shelf', PromoShelfChooserBlock(target_model="shelves.PromoShelf", icon="image")),
        ('banner_shelf', BannerShelfChooserBlock(target_model="shelves.BannerShelf", icon="image")),
        ('grid_shelf', Grid(icon="form")),
        ('recipe_grid_shelf', RecipeGrid(icon="form")),
        ('find_out_more_dropdown', FindOutMoreDropDown(label="Link dropdown", icon="order-down")),
        ('iframe_shelf', IFrameShelf(label="IFrame", icon='placeholder')),
        ('divider', Divider(label="Divider", icon='horizontalrule')),
        ('article_page_heading_shelf', ArticlePageHeadingShelf(label="Article Page Heading", icon='title')),
        ('table', Table(label="Table", icon='list-ul')),
        ('script_shelf', InlineScriptPanel(label="Script shelf", icon='code')),
    ], null=True, blank=True)

    # Meta Fields
    og_title = models.CharField(max_length=255, default="One You - Home",)
    og_description = models.CharField(max_length=255, default="Start the fight back to a healthier you! One You is"
                                                              " packed with practical tips, tools and free apps"
                                                              " to help you improve your health today")
    og_url = models.CharField(max_length=255, blank=True)
    og_image_fk = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        default=1,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="OG image"
    )
    og_type = models.CharField(max_length=255, default="website")
    twitter_url = models.CharField(max_length=255, blank=True)
    twitter_card = models.CharField(max_length=255, default="summary")
    twitter_site = models.CharField(max_length=255, default="@OneYouPHE")
    twitter_title = models.CharField(max_length=255, default="One You - Home")
    twitter_description = models.CharField(max_length=255,
                                           default="Start the fight back to a healthier you! One You is packed with"
                                                   " practical tips, tools and free apps to help you improve"
                                                   " your health today")

    use_share_button = models.BooleanField(default=True)

    twitter_image_fk = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        default=1,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Twitter image"
    )
    release = models.ForeignKey(
        'release.Release',
        related_name='pages',
        blank=True,
        null=True,
        default=None,
        on_delete=models.SET_NULL,
        limit_choices_to={'content_status': CONTENT_STATUS_PENDING})

    theme = models.ForeignKey(
        'pages.Theme',
        related_name='pages',
        null=True,
        on_delete=models.SET_NULL)

    @property
    def og_image(self):
        try:
            return self.og_image_fk.file.url
        except AttributeError:
            pass
        except ValueError:
            pass
        return ""

    @property
    def twitter_image(self):
        try:
            return self.twitter_image_fk.file.url
        except AttributeError:
            pass
        except ValueError:
            pass
        return ""

    @property
    def page_theme(self):
        return self.theme.to_dict()

    @property
    def link_url(self):
        # TODO: This could potentially use some base page methods
        site_name = SiteSettings.objects.get(site_id=self.get_site().id).uid
        return '/' + site_name + self.url_path

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
        FieldPanel('release'),
        SnippetChooserPanel('theme'),
    ]

    info_content_panels = [
        InlinePanel('change_history', label='Change history'),
    ]

    meta_content_panels = [
        MultiFieldPanel(
            [
                FieldPanel('og_title'),
                FieldPanel('og_description'),
                FieldPanel('og_url'),
                ImageChooserPanel('og_image_fk'),
                FieldPanel('og_type'),
            ],
            heading='Open Graph Tags',
            classname='collapsible collapsed'),
        MultiFieldPanel(
            [
                FieldPanel('twitter_url'),
                FieldPanel('twitter_card'),
                FieldPanel('twitter_site'),
                FieldPanel('twitter_title'),
                FieldPanel('twitter_description'),
                ImageChooserPanel('twitter_image_fk'),
            ],
            heading='Twitter Tags',
            classname='collapsible collapsed'),
        MultiFieldPanel(
            [
                FieldPanel('use_share_button'),
            ],
            heading='Share buttons',
            classname='collapsible collapsed'),
    ]

    promote_panels = [
        FieldPanel('slug'),
    ]

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(info_content_panels, heading='Notes'),
        ObjectList(meta_content_panels, heading='Meta'),
        ObjectList(Page.promote_panels, heading='Settings'),
    ])

    api_fields = ['body', 'path', 'depth', 'numchild', 'live', 'page_theme']

    def save(self, *args, **kwargs):
        assigned_release = self.release

        if self.release:
            self.release = None
        super(OneYou2Page, self).save(*args, **kwargs)
        newest_revision = self.get_latest_revision()

        if assigned_release:
            if self.live:
                assigned_release.add_revision(newest_revision)
            else:
                assigned_release.remove_page(self.id)

        return self

    def __init__(self, *args, **kwargs):
        super(OneYou2Page, self).__init__(*args, **kwargs)

    def serializable_data(self):
        obj = get_serializable_data_for_fields(self)

        for rel in get_all_child_relations(self):
            rel_name = rel.get_accessor_name()
            children = getattr(self, rel_name).all()

            if hasattr(rel.related_model, 'serializable_data'):
                obj[rel_name] = [child.serializable_data() for child in children]
            else:
                obj[rel_name] = [get_serializable_data_for_fields(child) for child in children]

        for field in get_all_child_m2m_relations(self):
            children = getattr(self, field.name).all()
            obj[field.name] = [child.pk for child in children]

        return obj

    def update_from_dict(self, obj_dict, default_excludes=None, excludes=None):
        if not default_excludes:
            default_excludes = ['id', 'path', 'depth', 'numchild', 'content_type_id', 'live_revision_id',
                                'page_ptr_id', 'oneyou2page_ptr_id', 'release_id', 'live', 'locked', 'url_path']
        if not excludes:
            excludes = []

        excludes = default_excludes + excludes
        for key, value in obj_dict.items():
            if key not in excludes and not key.startswith('_'):
                setattr(self, key, value)
        return self

    @classmethod
    def create_from_dict(cls, obj_dict):
        return cls(title=obj_dict['title'],
                   path=obj_dict['path'],
                   depth=obj_dict['depth'],
                   numchild=obj_dict['numchild'],
                   slug=obj_dict['meta']['slug'],
                   seo_title=obj_dict['meta']['seo_title'],
                   show_in_menus=obj_dict['meta']['show_in_menus'],
                   search_description=obj_dict['meta']['search_description'],
                   first_published_at=obj_dict['meta']['first_published_at'],
                   body=json.dumps(obj_dict['body']),
                   live=obj_dict['live'],
                   theme_id=obj_dict['page_theme']['id'])

    def serve_preview(self, request, mode_name):
        request.is_preview = True
        print("SERVE PREVIEW")

        if mode_name == 'json':
            from .serializers import OneYouPageSerializer
            latest_revision_as_page = self.get_latest_revision_as_page()
            serialized_page = OneYouPageSerializer(instance=latest_revision_as_page)
            return JsonResponse(serialized_page.data)

        if mode_name == 'react':
            context = {
                'preview_url': '/oneyou{}?preview_page={}'.format(self.get_url(), self.slug)
            }
            return SimpleTemplateResponse(template='preview_wrapper.html', context=context)

        return self.serve(request)

    def serve(self, request, *args, **kwargs):
        request.is_preview = getattr(request, 'is_preview', False)

        return TemplateResponse(
            request,
            self.get_template(request, *args, **kwargs),
            self.get_context(request, *args, **kwargs)
        )

    DEFAULT_PREVIEW_MODES = [
        ('react', 'Default'),
        # ('html', 'AMP'),
        ('json', 'API'),
    ]

    @property
    def preview_modes(self):
        """
        A list of (internal_name, display_name) tuples for the modes in which
        this page can be displayed for preview/moderation purposes. Ordinarily a page
        will only have one display mode, but subclasses of Page can override this -
        for example, a page containing a form might have a default view of the form,
        and a post-submission 'thankyou' page
        """
        return self.DEFAULT_PREVIEW_MODES

    @property
    def default_preview_mode(self):
        return self.preview_modes[0][0]


class RecipePage(OneYou2Page):
    DIFFICULTY_OPTIONS = (
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    )
    image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    recipe_name = models.CharField(max_length=255, null=True, blank=True)
    tags = models.CharField(max_length=255, null=True, blank=True)
    serves = models.IntegerField(default=0)
    preparation_time = models.IntegerField(default=0)
    difficulty = models.CharField(max_length=255, choices=DIFFICULTY_OPTIONS, default='medium')
    ingredients_list = RichTextField(null=True, blank=True)
    instructions = RichTextField(null=True, blank=True)

    content_panels = [
        FieldPanel('title'),
        ImageChooserPanel('image'),
        FieldPanel('recipe_name'),
        FieldPanel('tags'),
        FieldPanel('serves'),
        FieldPanel('preparation_time'),
        FieldPanel('difficulty'),
        FieldPanel('ingredients_list'),
        FieldPanel('instructions'),
        FieldPanel('body'),
        FieldPanel('release'),
        SnippetChooserPanel('theme'),
    ]

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(OneYou2Page.info_content_panels, heading='Notes'),
        ObjectList(OneYou2Page.meta_content_panels, heading='Meta'),
        ObjectList(Page.promote_panels, heading='Settings'),
    ])

    # def __init__(self, *args, **kwargs):
    #     super(RecipePage, self).__init__(*args, **kwargs)
    #     print('recipepage init', self.__dict__)
    #
    def save(self, *args, **kwargs):
        assigned_release = self.release

        if self.release:
            self.release = None

        super(RecipePage, self).save(*args, **kwargs)
        newest_revision = self.get_latest_revision()

        if assigned_release:
            if self.live:
                assigned_release.add_revision(newest_revision)
            else:
                assigned_release.remove_page(self.id)

        return self

    def serve_preview(self, request, mode_name):
        request.is_preview = True

        if mode_name == 'json':
            from .serializers import RecipePageSerializer
            latest_revision_as_page = self.get_latest_revision_as_page()
            serialized_page = RecipePageSerializer(instance=latest_revision_as_page)
            return JsonResponse(serialized_page.data)

        if mode_name == 'react':
            context = {
                'preview_url': '/oneyou{}?preview_page={}'.format(self.get_url(), self.slug)
            }
            return SimpleTemplateResponse(template='preview_wrapper.html', context=context)

        return self.serve(request)


# Orderables

class ChangeHistory(Orderable):
    page = ParentalKey(OneYou2Page, related_name='change_history')
    date_of_change = DateField(blank=False, verbose_name='Date')
    comment = TextField(blank=False)

    panels = [
        FieldPanel('date_of_change', classname='col4'),
        FieldPanel('comment', classname='col8'),
    ]


# Snippets
# TODO: Move these to shelves
@register_snippet
class Menu(SnippetCopyMixin, models.Model):
    label = models.CharField(max_length=255)
    menu_items = StreamField([
        ('simple_menu_item', SimpleMenuItem()),
        ('multi_menu_item', MultiMenuItem())
    ])

    panels = [
        FieldPanel('label'),
        StreamFieldPanel('menu_items')
    ]

    def __str__(self):
        return self.label


snippet_copy_registry.register(Menu, 'label')


@register_snippet
class Footer(models.Model):
    label = models.CharField(max_length=255)
    image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    menu_items = StreamField([
        ('simple_menu_item', SimpleMenuItem()),
    ])

    follow_us = StreamField([
        ('social_media_link', SocialMediaFooterLink()),
    ])

    panels = [
        FieldPanel('label'),
        ImageChooserPanel('image'),
        StreamFieldPanel('menu_items'),
        StreamFieldPanel('follow_us')
    ]

    def __str__(self):
        return self.label


@register_snippet
class Header(models.Model):
    label = models.CharField(max_length=255)
    image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('label'),
        ImageChooserPanel('image'),
    ]

    def __str__(self):
        return self.label


@register_snippet
class Theme(models.Model):
    label = models.CharField(max_length=255)
    class_name = models.CharField(max_length=255)

    panels = [
        FieldPanel('label'),
        FieldPanel('class_name'),
    ]

    def __str__(self):
        return self.label

    def to_dict(self):
        return model_to_dict(self)
