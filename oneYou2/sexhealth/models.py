from wagtail.core.fields import StreamField
from wagtail.core.models import Page

from modelcluster.models import get_all_child_relations, get_all_child_m2m_relations

from pages.models import (GeneralShelvePage, PageHeading, BannerShelf, Grid, AccordionGroup, SimplePageHeading,
    SectionHeading, PromoShelf, Carousel, PanelCarousel, IFrameShelf, Divider, InlineScriptPanel, InlineSvgPanel,
    TwoColumnShelf)
from pages.utils import get_serializable_data_for_fields


class SexHealthPage(GeneralShelvePage):
    body = StreamField([
        ('page_heading_shelf', PageHeading(icon='title')),
        ('simple_page_heading_shelf', SimplePageHeading(icon='title')),
        ('section_heading_shelf', SectionHeading(classname="full title", icon='title')),
        ('promo_shelf_v2', PromoShelf(icon="title")),
        ('banner_shelf_v2', BannerShelf(icon="title")),
        ('grid_shelf', Grid(icon="form")),
        ('accordion_group', AccordionGroup(label="Accordion Group", icon='form')),
        ('carousel_shelf', Carousel(icon="repeat")),
        ('panel_carousel_shelf', PanelCarousel(icon="repeat")),
        ('iframe_shelf', IFrameShelf(label="IFrame", icon='placeholder')),
        ('divider', Divider(label="Divider", icon='horizontalrule')),
        ('script_shelf', InlineScriptPanel(label="Script shelf", icon='code')),
        ('svg_shelf', InlineSvgPanel(label="SVG shelf", icon='snippet')),
        ('two_column_shelf', TwoColumnShelf(label="Two Column Shelf", icon='grip')),
    ], null=True, blank=True)

    @classmethod
    def allowed_subpage_models(cls):
        """
        Returns the list of page types that this page type can have as subpages,
        as a list of model classes
        """
        return [
            SexHealthPage
        ]

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
                                'page_ptr_id', 'sexhealthpage_ptr_id', 'release_id', 'live', 'locked', 'url_path']
        if not excludes:
            excludes = []

        excludes = default_excludes + excludes
        for key, value in obj_dict.items():
            if key not in excludes and not key.startswith('_'):
                setattr(self, key, value)
        return self

    def serve_preview(self, request, mode_name):
        return super(SexHealthPage, self).serve_preview(request, mode_name, 'sexhealth')

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


SexHealthPage._meta.get_field('og_title').default = "Sexual Health - Home"
SexHealthPage._meta.get_field('og_description').default = "Description"
SexHealthPage._meta.get_field('twitter_site').default = "@OneYouPHE"
SexHealthPage._meta.get_field('twitter_title').default = "Sexual Health - Home"
SexHealthPage._meta.get_field('twitter_description').default = "Description"


# Add SexHealthPage from page creation
Page.subpage_types.append(SexHealthPage)