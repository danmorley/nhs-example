from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.utils.http import urlquote
from django.utils.translation import ugettext as _
from django.urls import reverse

from wagtail.admin import messages
from wagtail.admin.forms import CopyForm
from wagtail.admin.utils import user_passes_test, user_has_any_page_permission, send_notification
from wagtail.admin.views.pages import get_valid_next_url_from_request, approve_moderation, reject_moderation
from wagtail.core import hooks
from wagtail.core.models import Page, UserPagePermissionsProxy

from home.models import SiteSettings
from release.models import Release


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

            # Copy the page
            print('YYYYY')
            print(page.slug)
            print(page.theme)
            print('NNNN')
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

def edit(request, page_id):
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
                from release.models import Release
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
        'rendition': SiteSettings.objects.get(site=page.get_site()).rendition,
    })


def revisions_view(request, page_id, revision_id):
    page = get_object_or_404(Page, id=page_id).specific
    revision = get_object_or_404(page.revisions, id=revision_id)
    revision_page = revision.as_page_object()

    print("PAGES revisions_view", revision_id)
    return revision_page.serve_preview(page.dummy_request(request), page.default_preview_mode, revision_id)


def approve_moderation_release(request, revision_id):
    from release.models import ReleasePage
    try:
        release_page = ReleasePage.objects.get(revision=revision_id, submitted_for_moderation=True)
        release_page.release.add_revision(release_page.revision)
    except ReleasePage.DoesNotExist:
        pass
    return approve_moderation(request, revision_id)


def reject_moderation_release(request, revision_id):
    from release.models import ReleasePage
    try:
        release_page = ReleasePage.objects.get(revision=revision_id, submitted_for_moderation=True)
        ReleasePage.remove_submitted_for_moderation(release_page.revision)
    except ReleasePage.DoesNotExist:
        pass
    return reject_moderation(request, revision_id)