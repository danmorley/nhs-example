from django.db import models
from django.http import JsonResponse
from django.template.response import TemplateResponse, SimpleTemplateResponse

from wagtail.admin.edit_handlers import (FieldPanel, InlinePanel, StreamFieldPanel, ObjectList, TabbedInterface,
    MultiFieldPanel)
from wagtail.core.models import Page
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel

from modelcluster.models import get_all_child_relations, get_all_child_m2m_relations

from home.models import SiteSettings

from .utils import get_serializable_data_for_fields


CONTENT_STATUS_PENDING = 0


class Tracking(models.Model):
    tracking_group = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        abstract = True


class Social(models.Model):
    # Meta Fields
    og_title = models.CharField(max_length=255, default='Home',)
    og_description = models.CharField(max_length=255, default='Description')
    og_url = models.CharField(max_length=255, blank=True)
    og_image_fk = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        default=1,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='OG image'
    )
    og_type = models.CharField(max_length=255, default='website')

    twitter_url = models.CharField(max_length=255, blank=True)
    twitter_card = models.CharField(max_length=255, default='summary')
    twitter_site = models.CharField(max_length=255, default='@TwitterUser')
    twitter_title = models.CharField(max_length=255, default='Home')
    twitter_description = models.CharField(max_length=255, default='Description')

    use_share_button = models.BooleanField(default=True)
    use_email_button = models.BooleanField(default=False)
    use_print_button = models.BooleanField(default=False)

    twitter_image_fk = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        default=1,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Twitter image'
    )

    class Meta:
        abstract = True


# Pages
class GeneralShelvePage(Page):
    release = models.ForeignKey(
        'release.Release',
        related_name='%(class)s_pages',
        blank=True,
        null=True,
        default=None,
        on_delete=models.SET_NULL,
        limit_choices_to={'content_status': CONTENT_STATUS_PENDING})

    theme = models.ForeignKey(
        'pages.Theme',
        related_name='%(class)s_pages',
        null=True,
        on_delete=models.SET_NULL)
    
    hide_from_breadcrumb = models.BooleanField(default=False)

    @property
    def og_image(self):
        try:
            return self.og_image_fk.file.url
        except AttributeError:
            pass
        except ValueError:
            pass
        return ''

    @property
    def twitter_image(self):
        try:
            return self.twitter_image_fk.file.url
        except AttributeError:
            pass
        except ValueError:
            pass
        return ''

    @property
    def page_theme(self):
        return self.theme.to_dict()

    @property
    def link_url(self):
        # TODO: This could potentially use some base page methods
        import re
        url_path = self.url_path
        # Remove homepage slug from url_path
        site_settings = SiteSettings.objects.get(site=self.get_site())
        homepage_slug_path = site_settings.site.root_page.slug
        regexp = r'/{0}(/.*)'.format(homepage_slug_path)
        matchObj = re.match( regexp, self.url_path)
        if matchObj:
            url_path = matchObj.group(1)
        return '/' + site_settings.uid + url_path

    @property
    def breadcrumbs(self):
        ancestors = self.get_ancestors().live()[1:]
        breadcrumbs = []
        for ancestor in ancestors:
            # If root page it doesn't have link url
            try:
                breadcrumbs.append({
                    'name': ancestor.specific.seo_title or ancestor.specific.title ,
                    'url': ancestor.specific.link_url,
                    'visible': not ancestor.specific.hide_from_breadcrumb,
                })
            except AttributeError:
                site_name = SiteSettings.objects.get(site=self.get_site()).uid
                breadcrumbs.append({
                    'name': ancestor.specific.seo_title or ancestor.specific.title,
                    'url': '/' + site_name,
                    'visible': True,
                })
        return breadcrumbs

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
                FieldPanel('use_email_button'),
                FieldPanel('use_print_button'),
            ],
            heading='Share buttons',
            classname='collapsible collapsed'),
        MultiFieldPanel(
            [
                FieldPanel('tracking_group'),
            ],
            heading='Tracking',
            classname='collapsible collapsed'),
    ]

    promote_panels = [
        MultiFieldPanel(
            [
                FieldPanel('slug'),
                FieldPanel('seo_title'),
                FieldPanel('show_in_menus'),
                FieldPanel('search_description'),
                FieldPanel('hide_from_breadcrumb'),
            ],
            heading='Common page configuration',
        )
    ]

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(info_content_panels, heading='Notes'),
        ObjectList(meta_content_panels, heading='Meta'),
        ObjectList(promote_panels, heading='Settings'),
    ])

    api_fields = ['body', 'path', 'depth', 'numchild', 'live', 'page_theme']
    exclude_fields_in_copy = ['release']

    class Meta:
        abstract = True

    @classmethod
    def get_serializer(cls):
        import importlib
        app = cls.__module__.rsplit('.', 1)[0]
        module = '{}.serializers'.format(app)
        serializer_name = '{}Serializer'.format(cls.__name__)
        serializers_module = importlib.import_module(module)
        serializer = getattr(serializers_module, serializer_name)
        return serializer

    def save_revision(self, user=None, submitted_for_moderation=False, approved_go_live_at=None, changed=True):
        revision = super(GeneralShelvePage, self).save_revision(user, submitted_for_moderation, approved_go_live_at, changed)
        assigned_release = self.release
        self.release = None
        if self.release:
            self.release = None

        if assigned_release:
            if self.live:
                assigned_release.add_revision(revision)
            else:
                assigned_release.remove_page(self.id)

        return revision

    def serve_preview(self, request, mode_name, site_name, revision_id='latest'):
        request.is_preview = True

        if mode_name == 'json':
            Serializer = self.__class__.get_serializer()
            latest_revision_as_page = self.get_latest_revision_as_page()
            serialized_page = Serializer(instance=latest_revision_as_page)
            return JsonResponse(serialized_page.data)

        if mode_name == 'react':
            path = self.get_url_parts(request)[2] if self.get_url_parts(request) is not None else '/home'
            context = {
                'preview_url': '/{}{}?is_preview&revision={}'.format(site_name, path, revision_id)
            }
            return SimpleTemplateResponse(template='preview_wrapper.html', context=context)

        return self.serve(request)

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