from django.db import models

from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, TabbedInterface, ObjectList
from wagtail.core.fields import StreamField, RichTextField
from wagtail.core.models import Page
from wagtail.images.edit_handlers import ImageChooserPanel

from images.renditions import MOBILE_RENDITION_CHOICES, DESKTOP_RENDITION_CHOICES

from dctcmsbase.models import GeneralShelvePage, Tracking, Social
from dctcmsbase.panels import VIDEO_HOSTS
from dctcmsbase.shelves import (PageHeadingShelf, DividerShelf, InlineScriptShelf, BannerShelf,
    StandardGridShelf, IFrameShelf, InlineSvgShelf, SimplePageHeadingShelf, FindOutMoreDropDownShelf,
    CarouselShelf, TableShelf)
from wagtail.snippets.edit_handlers import SnippetChooserPanel

from home.models import SiteSettings

from .sharedcontent import Action
from .shelves import (OneYouGridShelf, OneYouTwoColumnShelf, OneYouSectionHeadingShelf, ActionPlanShelf,
    ActionPlanDisplayShelf, ArticleOneYouGridShelf)


class OneYouPage(GeneralShelvePage, Tracking, Social):
    body = StreamField([
        ('page_heading_shelf', PageHeadingShelf(icon='title')),
        ('section_heading_shelf', OneYouSectionHeadingShelf(classname='full title', icon='title')),
        ('divider_shelf', DividerShelf(label='Divider', icon='horizontalrule')),
        ('script_shelf', InlineScriptShelf(label='Script shelf', icon='code')),
        ('banner_shelf', BannerShelf(icon='title')),
        ('grid_shelf', OneYouGridShelf(icon='form')),
        ('two_column_shelf', OneYouTwoColumnShelf(label='Two Column Shelf', icon='grip')),
        ('iframe_shelf', IFrameShelf(label='IFrame', icon='placeholder')),
        ('svg_shelf', InlineSvgShelf(label='SVG shelf', icon='snippet')),
        ('simple_page_heading_shelf', SimplePageHeadingShelf(icon='title')),
        ('find_out_more_dropdown_shelf', FindOutMoreDropDownShelf(label='Link dropdown', icon='order-down')),
        ('carousel_shelf', CarouselShelf(icon='repeat')),
        ('action_plan_shelf', ActionPlanShelf(label='Action Plan Builder shelf', icon='form')),
        ('action_plan_display_shelf', ActionPlanDisplayShelf(label='Action Plan Display shelf', icon='form')),
        ('table_shelf', TableShelf(label='Table', icon='list-ul')),
    ], null=True, blank=True)

    @classmethod
    def allowed_subpage_models(cls):
        """
        Returns the list of page types that this page type can have as subpages,
        as a list of model classes
        """
        return [
            OneYouPage, RecipePage, ArticleOneYouPage,
        ]

    def serve_preview(self, request, mode_name, revision_id='latest'):
        site_name = SiteSettings.objects.get(site=self.get_site()).uid
        return super(OneYouPage, self).serve_preview(request, mode_name, site_name, revision_id)


OneYouPage._meta.get_field('og_title').default = 'One You - Home'
OneYouPage._meta.get_field('og_description').default = ('Start the fight back to a healthier you! One You is'
                                                         ' packed with practical tips, tools and free apps'
                                                         ' to help you improve your health today')
OneYouPage._meta.get_field('twitter_site').default = '@OneYouPHE'
OneYouPage._meta.get_field('twitter_title').default = 'One You - Home'
OneYouPage._meta.get_field('twitter_description').default = ('Start the fight back to a healthier you! One You is packed with'
                                                        ' practical tips, tools and free apps to help you improve'
                                                        ' your health today')


class RecipePage(GeneralShelvePage, Tracking, Social):
    DIFFICULTY_OPTIONS = (
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    )
    header_image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    header_image_mobile_rendition = models.CharField(choices=MOBILE_RENDITION_CHOICES,
                                      verbose_name='Mobile Rendition',
                                      default='none',
                                      max_length=10)
    header_image_desktop_rendition = models.CharField(choices=DESKTOP_RENDITION_CHOICES,
                                      verbose_name='Desktop Rendition',
                                      default='none',
                                      max_length=10)
    recipe_name = models.CharField(max_length=255, null=True, blank=True)
    tags = models.CharField(max_length=255, null=True, blank=True)
    serves = models.IntegerField(default=0)
    preparation_time = models.IntegerField(default=0)
    difficulty = models.CharField(max_length=255, choices=DIFFICULTY_OPTIONS, default='medium')
    ingredients_list = RichTextField(null=True, blank=True)
    instructions = RichTextField(null=True, blank=True)

    header_gradient = models.BooleanField(default=False)
    video_id = models.CharField(null=True, blank=True, max_length=50)
    host = models.CharField(choices=VIDEO_HOSTS, max_length=15, default='brightcove', null=True, blank=True)

    content_panels = [
        MultiFieldPanel(
            [
                FieldPanel('title'),
                FieldPanel('tags'),
            ],
            heading='General',
        ),
        MultiFieldPanel(
            [
                ImageChooserPanel('header_image'),
                FieldPanel('header_image_mobile_rendition'),
                FieldPanel('header_image_desktop_rendition'),
                FieldPanel('header_gradient'),
                FieldPanel('recipe_name'),
                FieldPanel('video_id'),
                FieldPanel('host'),
            ],
            heading='Header',
        ),
        MultiFieldPanel(
            [
                FieldPanel('serves'),
                FieldPanel('preparation_time'),
                FieldPanel('difficulty'),
                FieldPanel('ingredients_list'),
                FieldPanel('instructions'),
            ],
            heading='Recipe details',
        ),
        FieldPanel('release'),
        SnippetChooserPanel('page_theme'),
    ]

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(GeneralShelvePage.info_content_panels, heading='Notes'),
        ObjectList(GeneralShelvePage.meta_content_panels, heading='Meta'),
        ObjectList(Page.promote_panels, heading='Settings'),
    ])

    @classmethod
    def allowed_subpage_models(cls):
        """
        Returns the list of page types that this page type can have as subpages,
        as a list of model classes
        """
        return [
            OneYouPage, RecipePage, ArticleOneYouPage,
        ]


class ArticleOneYouPage(GeneralShelvePage, Tracking, Social):
    body = StreamField([
        ('page_heading_shelf', PageHeadingShelf(icon='title')),
        ('banner_shelf', BannerShelf(icon='title')),
        ('section_heading_shelf', OneYouSectionHeadingShelf(classname='full title', icon='title')),
        ('svg_shelf', InlineSvgShelf(label='SVG shelf', icon='snippet')),
        ('grid_shelf', ArticleOneYouGridShelf(icon='form')),
    ], null=True, blank=True)

    @classmethod
    def allowed_subpage_models(cls):
        """
        Returns the list of page types that this page type can have as subpages,
        as a list of model classes
        """
        return [
            OneYouPage, RecipePage, ArticleOneYouPage,
        ]

    def serve_preview(self, request, mode_name, revision_id='latest'):
        site_name = SiteSettings.objects.get(site=self.get_site()).uid
        return super(ArticleOneYouPage, self).serve_preview(request, mode_name, site_name, revision_id)


ArticleOneYouPage._meta.get_field('og_title').default = 'One You - Home'
ArticleOneYouPage._meta.get_field('og_description').default = ('Start the fight back to a healthier you! One You is'
                                                         ' packed with practical tips, tools and free apps'
                                                         ' to help you improve your health today')
ArticleOneYouPage._meta.get_field('twitter_site').default = '@OneYouPHE'
ArticleOneYouPage._meta.get_field('twitter_title').default = 'One You - Home'
ArticleOneYouPage._meta.get_field('twitter_description').default = ('Start the fight back to a healthier you! One You is packed with'
                                                        ' practical tips, tools and free apps to help you improve'
                                                        ' your health today')

# Add OneYouPage from page creation
Page.subpage_types.append(OneYouPage)
# Page.subpage_types.append(RecipePage)
# Page.subpage_types.append(ArticleOneYouPage)