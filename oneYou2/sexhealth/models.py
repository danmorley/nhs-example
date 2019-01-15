from wagtail.core.fields import StreamField
from wagtail.core.models import Page

from dctcmsbase.models import GeneralShelvePage, Tracking, Social
from dctcmsbase.shelves import (BannerShelf, CarouselShelf, SimplePageHeadingShelf, SimpleSectionHeadingShelf,
    SimpleRichTextShelf, InlineScriptShelf)

from home.models import SiteSettings

from .shelves import (SexHealthPageHeadingShelf, SexHealthPageHeadingWithVideoShelf, SexHealthGridShelf,
    SexHealthTwoColumnShelf)


class SexHealthPage(GeneralShelvePage, Tracking, Social):
    body = StreamField([
        ('sexhealth_page_heading_shelf', SexHealthPageHeadingShelf(icon='title')),
        ('sexhealth_page_heading_shelf_with_video', SexHealthPageHeadingWithVideoShelf(icon='title')),
        ('banner_shelf', BannerShelf(icon='title')),
        ('grid_shelf', SexHealthGridShelf(icon='form')),
        ('carousel_shelf', CarouselShelf(icon='repeat')),
        ('two_column_shelf', SexHealthTwoColumnShelf(label='Two Column Shelf', icon='grip')),
        ('simple_page_heading_shelf', SimplePageHeadingShelf(icon='title')),
        ('simple_section_heading_shelf', SimpleSectionHeadingShelf(icon='title')),
        ('simple_richtext_shelf', SimpleRichTextShelf(icon='title')),
        ('script_shelf', InlineScriptShelf(label='Script shelf', icon='code')),
    ], null=True, blank=True)

    @classmethod
    def allowed_subpage_models(cls):
        """
        Returns the list of page types that this page type can have as subpages,
        as a list of model classes
        """
        return [SexHealthPage]

    def serve_preview(self, request, mode_name, revision_id='latest'):
        site_name = SiteSettings.objects.get(site=self.get_site()).uid
        return super(SexHealthPage, self).serve_preview(request, mode_name, site_name, revision_id)


SexHealthPage._meta.get_field('og_title').default = 'Sexual Health - Home'
SexHealthPage._meta.get_field('og_description').default = 'Description'
SexHealthPage._meta.get_field('twitter_site').default = '@OneYouPHE'
SexHealthPage._meta.get_field('twitter_title').default = 'Sexual Health - Home'
SexHealthPage._meta.get_field('twitter_description').default = 'Description'


# Add SexHealthPage from page creation
Page.subpage_types.append(SexHealthPage)