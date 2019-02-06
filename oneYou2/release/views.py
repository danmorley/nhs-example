from __future__ import unicode_literals
import json
import re
from urllib.parse import urlparse, urlunparse

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template import Context, Template
from django.urls import reverse
from django.utils.http import urlquote
from django.utils.translation import ugettext as _
from django.views.static import serve

from wagtail.admin import messages
from wagtail.admin.forms import CopyForm
from wagtail.admin.utils import user_passes_test, user_has_any_page_permission, send_notification
from wagtail.admin.views.pages import approve_moderation, reject_moderation, get_valid_next_url_from_request
from wagtail.contrib.redirects.models import Redirect
from wagtail.core import hooks
from wagtail.core.models import Page, UserPagePermissionsProxy

from frontendHandler.models import FrontendVersion
from home.models import SiteSettings
from oneYou2.utils import get_protocol
from release.utils import get_latest_release, get_latest_live_release

from .models import Release, ReleasePage


def release_html(request, site_name):
    try:
        site_setting = SiteSettings.objects.get(uid=site_name)
        site_id = site_setting.site.id
    except ObjectDoesNotExist:
        return HttpResponse('Page Not Found', status=404)

    if getattr(request, 'path', None):
        # This redirection doesn't support multisite on different domain
        url = urlparse(request.get_full_path())
        path = url.path[:-1] if url.path[-1] == '/' else url.path
        site_redirects = Redirect.get_for_site(site_id)
        wagtail_redirect = site_redirects.filter(old_path=path).first()

        if wagtail_redirect:
            if wagtail_redirect.redirect_page:
                url = url._replace(path=wagtail_redirect.redirect_page.specific.link_url)
                redirect_path = urlunparse(url)
            else:
                # Re-direct is to a link
                redirect_path = wagtail_redirect.redirect_link
            return redirect(redirect_path, permanent=wagtail_redirect.is_permanent)

    major_frontend_version = None
    release_id = request.GET.get('id')
    if release_id:
        release = Release.objects.get(uuid=release_id)
    else:
        if 'is_preview' in request.GET:
            release = get_latest_release(site_id)
        else:
            release = get_latest_live_release(site_id)

    frontend_name = release.get_frontend_id_display()
    matchObj = re.match( r'V([0-9]+)\..* - .*', frontend_name.replace('\n', ''), re.I | re.M)
    if matchObj:
        try:
            major_frontend_version = int(matchObj.group(1))
        except ValueError:
            pass

    if release:
        frontend_id = release.frontend_id
        uuid = release.uuid
    else:
        # In this sc
        frontend_id = FrontendVersion.get_current_version()
        uuid = 'current'

    host = request.META['HTTP_HOST']
    if settings.CONTENT_STORE_ENDPOINT:
        content_store_endpoint = settings.CONTENT_STORE_ENDPOINT
    else:
        content_store_endpoint = get_protocol() + host + '/api'

    if major_frontend_version and major_frontend_version <= 1:
        # legacy to render frontend index.html before multisite have been implemented
        index = FrontendVersion.get_html_for_version(frontend_id)
        substituted_index = index.replace("/static/css/", "/{}/version/css/{}/?file_name=".format(site_name, frontend_id))
        substituted_index = substituted_index.replace("/static/js/",
                                                    "/{}/version/js/{}/?file_name=".format(site_name, frontend_id))
        substituted_index = substituted_index.replace("/manifest", "/{}/public/manifest".format(site_name))
        substituted_index = substituted_index.replace("/favicon", "/{}/public/{}/favicon".format(site_name, frontend_id))
        substituted_index = substituted_index.replace("/webtrends.min.js", "/{}/public/{}/webtrends.min.js".format(site_name, frontend_id))

        host = request.META['HTTP_HOST']
        if settings.CONTENT_STORE_ENDPOINT:
            content_store_endpoint = settings.CONTENT_STORE_ENDPOINT
        else:
            content_store_endpoint = get_protocol() + host + "/api"

        substituted_index = substituted_index.replace("%apiurl%", content_store_endpoint)
        substituted_index = substituted_index.replace("%releaseid%", uuid)
        substituted_index = substituted_index.replace("%adobe_tracking_url%", settings.ADOBE_TRACKING_URL)
        http_response = HttpResponse(substituted_index)
    else:
        template = Template(FrontendVersion.get_html_for_version(frontend_id))

        context = Context({
            'site_setting': site_setting,
            'api_url': content_store_endpoint,
            'release_id': uuid,
            'public_url': '/{}/public/{}'.format(site_name, frontend_id),
            'css_path': '/{}/version/css/{}/?file_name='.format(site_name, frontend_id),
            'js_path': '/{}/version/js/{}/?file_name='.format(site_name, frontend_id),
        })

        if settings.ENV == 'local':
            context['public_url'] = '/static'

        http_response = HttpResponse(template.render(context))

    if release and release.content_status == 1:
        http_response['Cache-Control'] = 'max-age=900'
    return http_response


def release_js(request, site_name, version_id):
    file_name = request.GET.get('file_name')
    main_js = FrontendVersion.get_js_for_version(version_id, file_name)
    substituted_main_js = main_js.replace('/static/media', '/{}/public/static/media'.format(site_name))
    return HttpResponse(substituted_main_js)


def release_css(request, site_name, version_id):
    file_name = request.GET.get('file_name')
    main_css = FrontendVersion.get_css_for_version(version_id, file_name)
    substituted_main_css = main_css.replace('/static/media', '/{}/public/{}/static/media'.format(site_name, version_id))
    return HttpResponse(substituted_main_css, 'text/css')


def cms_statics(request, path):
    return serve(request, path, document_root='./static/')


def web_statics(request, site_name, path):
    return serve(request, path, document_root='./web/static/')


def statics(request, site_name, path):
    path_components = path.split('/')
    file_name = path_components.pop()
    FrontendVersion.load_static('/'.join(path_components), file_name)
    return serve(request, file_name, document_root='./web/')


def open_releases(request):
    releases = Release.objects.filter(content_status=0)
    response_obj = []
    for release in releases:
        response_obj.append({'id': release.id, 'name': release.release_name})
    return JsonResponse({'releases': response_obj})


def release_view(request, release_id):
    release, live_release = None, None
    error_msg = ''
    pages = {}

    try:
        release = Release.objects.get(id=release_id)
    except Release.DoesNotExist:
        error_msg = 'This release id {} doesn\'t exist'.format(release_id)

    if release:
        pages_release = ReleasePage.objects.filter(release__id=release_id)

        # compare with the current live release if release is pending else compare with the previous frozen release
        live_pages_release = None
        if release.content_status == 0:
            # get live release content
            try:
                live_release = get_latest_live_release(release.site.id)
                live_pages_release = ReleasePage.objects.filter(release__id=live_release.id)
            except (Release.DoesNotExist, AttributeError) as e:
                error_msg = 'No live release'
        else:
            live_release = Release.objects.filter(release_time__lte=release.release_time, site__id=release.site.id, content_status=1).exclude(id=release.id).order_by('-release_time').first()
            if not live_release:
                error_msg = 'No live release'
        
        # Compare release with live release
        for page_release in pages_release:
            page_detail = page_release.get_page_detail_dict('new')

            if live_release:
                try:
                    live_page_release =  ReleasePage.objects.get(
                        release__id=live_release.id,
                        revision__page=page_release.revision.page)
                    if live_page_release.revision.id != page_release.revision.id:
                        page_detail['status'] = 'updated'
                    else:
                        page_detail['status'] = 'unchanged'
                except ReleasePage.DoesNotExist:
                    pass
            
            pages.update({page_release.revision.page.id: page_detail})
        
        # Check if pages have been removed from live release
        if live_pages_release:
            for live_page_release in live_pages_release:
                if live_page_release.revision.page.id not in pages:
                    pages.update({
                        live_page_release.revision.page.id: live_page_release.get_page_detail_dict('removed')
                    })

    return render(request, 'wagtailadmin/release/detail.html', {
        'release': release,
        'live_release': live_release,
        'pages': pages,
        'error_msg': error_msg,
    })


def unpublish(request, page_id):
    page = get_object_or_404(Page, id=page_id).specific

    user_perms = UserPagePermissionsProxy(request.user)
    if not user_perms.for_page(page).can_unpublish():
        raise PermissionDenied

    next_url = get_valid_next_url_from_request(request)

    include_descendants = request.POST.get('include_descendants', False)

    page.unpublish()

    if include_descendants:
        live_descendant_pages = page.get_descendants().live().specific()
        for live_descendant_page in live_descendant_pages:
            if user_perms.for_page(live_descendant_page).can_unpublish():
                live_descendant_page.unpublish()

    messages.success(request, _('Page \'{0}\' unpublished.').format(page.get_admin_display_title()), buttons=[
        messages.button(reverse('wagtailadmin_pages:edit', args=(page.id,)), _('Edit'))
    ])

    page.release_id = request.POST.get('release', None)
    page.save_revision(request.user)

    if next_url:
        return redirect(next_url)
    return redirect('wagtailadmin_explore', page.get_parent().id)


def revisions_view(request, page_id, revision_id):
    page = get_object_or_404(Page, id=page_id).specific
    revision = get_object_or_404(page.revisions, id=revision_id)
    revision_page = revision.as_page_object()
    return revision_page.serve_preview(page.dummy_request(request), page.default_preview_mode, revision_id)


def approve_moderation_release(request, revision_id):
    try:
        release_page = ReleasePage.objects.get(revision=revision_id, submitted_for_moderation=True)
        release_page.release.add_revision(release_page.revision)
    except ReleasePage.DoesNotExist:
        pass
    return approve_moderation(request, revision_id)


def reject_moderation_release(request, revision_id):
    try:
        release_page = ReleasePage.objects.get(revision=revision_id, submitted_for_moderation=True)
        ReleasePage.remove_submitted_for_moderation(release_page.revision)
    except ReleasePage.DoesNotExist:
        pass
    return reject_moderation(request, revision_id)


def edit(request, page_id):
    from PIL import ImageFile
    ImageFile.LOAD_TRUNCATED_IMAGES = True

    real_page_record = get_object_or_404(Page, id=page_id)
    latest_revision = real_page_record.get_latest_revision()
    page = real_page_record.get_latest_revision_as_page()
    parent = page.get_parent()

    content_type = ContentType.objects.get_for_model(page)
    page_class = content_type.model_class()

    page_perms = page.permissions_for_user(request.user)
    if not page_perms.can_edit():
        raise PermissionDenied

    for fn in hooks.get_hooks('before_edit_page'):
        result = fn(request, page)
        if hasattr(result, 'status_code'):
            return result

    edit_handler = page_class.get_edit_handler()
    form_class = edit_handler.get_form_class()

    next_url = get_valid_next_url_from_request(request)

    errors_debug = None

    if request.method == 'POST':
        form = form_class(request.POST, request.FILES, instance=page,
                          parent_page=parent)

        if form.is_valid() and not page.locked:
            page = form.save(commit=False)

            is_publishing = bool(request.POST.get('action-publish')) and page_perms.can_publish()
            is_unpublishing = bool(request.POST.get('action-unpublish')) and page_perms.can_unpublish()
            is_submitting = bool(request.POST.get('action-submit'))
            is_reverting = bool(request.POST.get('revision'))

            # If a revision ID was passed in the form, get that revision so its
            # date can be referenced in notification messages
            if is_reverting:
                previous_revision = get_object_or_404(page.revisions, id=request.POST.get('revision'))

            # Save revision
            revision = page.save_revision(
                user=request.user,
                submitted_for_moderation=is_submitting,
            )
            # store submitted go_live_at for messaging below
            go_live_at = page.go_live_at

            # Publish
            if is_publishing:
                revision.publish()
                # Need to reload the page because the URL may have changed, and we
                # need the up-to-date URL for the "View Live" button.
                page = page.specific_class.objects.get(pk=page.pk)

                # Page is being published now

                if is_reverting:
                    message = _(
                        'Revision from {0} of page \'{1}\' has been published.'
                    ).format(
                        previous_revision.created_at.strftime('%d %b %Y %H:%M'),
                        page.get_admin_display_title()
                    )
                else:
                    message = _(
                        'Page \'{0}\' has been published.'
                    ).format(
                        page.get_admin_display_title()
                    )

                buttons = []
                if page.url is not None:
                    buttons.append(messages.button(page.url, _('View live'), new_window=True))
                buttons.append(messages.button(reverse('wagtailadmin_pages:edit', args=(page_id,)), _('Edit')))
                messages.success(request, message, buttons=buttons)

            # Unpublish
            if is_unpublishing:
                release_for_unpublish = request.POST.get('release')
                release = Release.objects.get(id=release_for_unpublish)
                release.remove_page(page_id)

                messages.success(request, _('Page \'{0}\' unpublished.').format(page.get_admin_display_title()), buttons=[
                    messages.button(reverse('wagtailadmin_pages:edit', args=(page.id,)), _('Edit'))
                ])

            elif is_submitting:

                message = _(
                    'Page \'{0}\' has been submitted for moderation.'
                ).format(
                    page.get_admin_display_title()
                )

                messages.success(request, message, buttons=[
                    messages.button(
                        reverse('wagtailadmin_pages:view_draft', args=(page_id,)),
                        _('View draft'),
                        new_window=True
                    ),
                    messages.button(
                        reverse('wagtailadmin_pages:edit', args=(page_id,)),
                        _('Edit')
                    )
                ])

                if not send_notification(page.get_latest_revision().id, 'submitted', request.user.pk):
                    messages.error(request, _('Failed to send notifications to moderators'))

            else:  # Saving

                if is_reverting:
                    message = _(
                        'Page \'{0}\' has been replaced with revision from {1}.'
                    ).format(
                        page.get_admin_display_title(),
                        previous_revision.created_at.strftime('%d %b %Y %H:%M')
                    )
                else:
                    message = _(
                        'Page \'{0}\' has been updated.'
                    ).format(
                        page.get_admin_display_title()
                    )

                messages.success(request, message)

            for fn in hooks.get_hooks('after_edit_page'):
                result = fn(request, page)
                if hasattr(result, 'status_code'):
                    return result

            if is_publishing or is_submitting:
                # we're done here - redirect back to the explorer
                if next_url:
                    # redirect back to 'next' url if present
                    return redirect(next_url)
                # redirect back to the explorer
                return redirect('wagtailadmin_explore', page.get_parent().id)
            else:
                # Just saving - remain on edit page for further edits
                target_url = reverse('wagtailadmin_pages:edit', args=[page.id])
                if next_url:
                    # Ensure the 'next' url is passed through again if present
                    target_url += '?next=%s' % urlquote(next_url)
                return redirect(target_url)
        else:
            if page.locked:
                messages.error(request, _('The page could not be saved as it is locked'))
            else:
                messages.validation_error(
                    request, _('The page could not be saved due to validation errors'), form
                )

            edit_handler = edit_handler.bind_to_instance(instance=page,
                                                         form=form,
                                                         request=request)
            errors_debug = (
                repr(edit_handler.form.errors) +
                repr([
                    (name, formset.errors)
                    for (name, formset) in edit_handler.form.formsets.items()
                    if formset.errors
                ])
            )
            has_unsaved_changes = True
    else:
        edit_handler = page_class.get_edit_handler()
        form_class = edit_handler.get_form_class()

        class CustomPageForm(form_class):
            def __init__(self, *args, **kwargs):
                super(CustomPageForm, self).__init__(*args, **kwargs)
                self.fields['release'].queryset = self.fields['release'].queryset.filter(site=self.instance.get_site())

        form = CustomPageForm(instance=page, parent_page=parent)
        edit_handler = edit_handler.bind_to_instance(instance=page, form=form, request=request)
        has_unsaved_changes = False

    # Check for revisions still undergoing moderation and warn
    if latest_revision and latest_revision.submitted_for_moderation:
        buttons = []

        if page.live:
            buttons.append(messages.button(
                reverse('wagtailadmin_pages:revisions_compare', args=(page.id, 'live', latest_revision.id)),
                _('Compare with live version')
            ))

        messages.warning(request, _('This page is currently awaiting moderation'), buttons=buttons)

    if page.live and page.has_unpublished_changes:
        # Page status needs to present the version of the page containing the correct live URL
        page_for_status = real_page_record.specific
    else:
        page_for_status = page

    rendition = None
    try:
        rendition = SiteSettings.objects.get(site=page.get_site()).rendition
    except SiteSettings.DoesNotExist:
        pass

    return render(request, 'wagtailadmin/pages/edit.html', {
        'page': page,
        'page_for_status': page_for_status,
        'content_type': content_type,
        'edit_handler': edit_handler,
        'errors_debug': errors_debug,
        'preview_modes': page.preview_modes,
        'form': form,
        'next': next_url,
        'has_unsaved_changes': has_unsaved_changes,
        'rendition': rendition,
    })


@user_passes_test(user_has_any_page_permission)
def copy(request, page_id):
    page = Page.objects.get(id=page_id)
    page = page.specific
    newest_revision = page.get_latest_revision()

    # Parent page defaults to parent of source page
    parent_page = page.get_parent()

    # Check if the user has permission to publish subpages on the parent
    can_publish = parent_page.permissions_for_user(request.user).can_publish_subpage()

    # Create the form
    form = CopyForm(request.POST or None, user=request.user, page=page, can_publish=can_publish)

    next_url = get_valid_next_url_from_request(request)

    for fn in hooks.get_hooks('before_copy_page'):
        result = fn(request, page)
        if hasattr(result, 'status_code'):
            return result

    # Check if user is submitting
    if request.method == 'POST':
        # Prefill parent_page in case the form is invalid (as prepopulated value for the form field,
        # because ModelChoiceField seems to not fall back to the user given value)
        parent_page = Page.objects.get(id=request.POST['new_parent_page'])

        if form.is_valid():
            # Receive the parent page (this should never be empty)
            if form.cleaned_data['new_parent_page']:
                parent_page = form.cleaned_data['new_parent_page']

            if not page.permissions_for_user(request.user).can_copy_to(parent_page,
                                                                       form.cleaned_data.get('copy_subpages')):
                raise PermissionDenied

            # Re-check if the user has permission to publish subpages on the new parent
            can_publish = parent_page.permissions_for_user(request.user).can_publish_subpage()

            new_page = newest_revision.as_page_object().copy(
                recursive=form.cleaned_data.get('copy_subpages'),
                to=parent_page,
                update_attrs={
                    'title': form.cleaned_data['new_title'],
                    'slug': form.cleaned_data['new_slug'],
                },
                keep_live=(can_publish and form.cleaned_data.get('publish_copies')),
                user=request.user,
            )

            # Give a success message back to the user
            if form.cleaned_data.get('copy_subpages'):
                messages.success(
                    request,
                    _('Page \'{0}\' and {1} subpages copied.').format(page.get_admin_display_title(), new_page.get_descendants().count())
                )
            else:
                messages.success(request, _('Page \'{0}\' copied.').format(page.get_admin_display_title()))

            for fn in hooks.get_hooks('after_copy_page'):
                result = fn(request, page, new_page)
                if hasattr(result, 'status_code'):
                    return result

            # Redirect to explore of parent page
            if next_url:
                return redirect(next_url)
            return redirect('wagtailadmin_explore', parent_page.id)

    return render(request, 'wagtailadmin/pages/copy.html', {
        'page': page,
        'form': form,
        'next': next_url,
    })