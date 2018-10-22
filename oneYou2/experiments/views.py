from __future__ import absolute_import, unicode_literals

import base64
import hashlib
import time
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import PermissionDenied
from django.core.urlresolvers import reverse
from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.utils.http import urlquote
from django.utils.translation import ugettext as _
from wagtail.contrib.modeladmin.helpers import PageAdminURLHelper
from wagtail.admin import messages, signals
from wagtail.admin.utils import (
    send_notification)
from wagtail.admin.views.pages import get_valid_next_url_from_request
from wagtail.core import hooks
from wagtail.core.models import Page


class VarientAdminURLHelper(PageAdminURLHelper):
    def get_action_url(self, action, *args, **kwargs):
        if action == 'add':
            url_name = 'experiments_oneyouvariant_add'
            target_url = reverse(url_name, args=args, kwargs=kwargs)
            url = '%s?next=%s' % (target_url, urlquote(self.index_url))
            return url
        if action == 'edit':
            url_name = 'experiments_oneyouvariant_edit'
            target_url = reverse(url_name, args=args, kwargs=kwargs)
            url = '%s?next=%s' % (target_url, urlquote(self.index_url))
            return url
        return super(VarientAdminURLHelper, self).get_action_url(action, *args, **kwargs)


def create(request, content_type_app_name, content_type_model_name, parent_page_id):
    parent_page = get_object_or_404(Page, id=parent_page_id).specific
    parent_page_perms = parent_page.permissions_for_user(request.user)
    if not parent_page_perms.can_add_subpage():
        raise PermissionDenied

    try:
        content_type = ContentType.objects.get_by_natural_key(content_type_app_name, content_type_model_name)
    except ContentType.DoesNotExist:
        raise Http404

    # Get class
    page_class = content_type.model_class()

    # Make sure the class is a descendant of Page
    if not issubclass(page_class, Page):
        raise Http404

    # page must be in the list of allowed subpage types for this parent ID
    if page_class not in parent_page.creatable_subpage_models():
        raise PermissionDenied

    if not page_class.can_create_at(parent_page):
        raise PermissionDenied

    for fn in hooks.get_hooks('before_create_page'):
        result = fn(request, parent_page, page_class)
        if hasattr(result, 'status_code'):
            return result

    page = page_class(owner=request.user)
    edit_handler = page_class.get_edit_handler()
    form_class = edit_handler.get_form_class()

    next_url = get_valid_next_url_from_request(request)

    if request.method == 'POST':
        form = form_class(request.POST, request.FILES, instance=page,
                          parent_page=parent_page)

        if form.is_valid():
            page = form.save(commit=False)

            # Save page
            parent_page.add_child(instance=page)

            # Save revision
            page.save_revision(
                user=request.user,
                submitted_for_moderation=False,
            )

            messages.success(request, _('Page \'{0}\' created.').format(page.get_admin_display_title()))

            for fn in hooks.get_hooks('after_create_page'):
                result = fn(request, page)
                if hasattr(result, 'status_code'):
                    return result

            # Just saving - remain on edit page for further edits
            target_url = reverse('experiments_oneyouvariant_edit', args=[page.id])
            if next_url:
                # Ensure the 'next' url is passed through again if present
                target_url += '?next=%s' % urlquote(next_url)
            return redirect(target_url)

        else:
            messages.validation_error(
                request, _('The page could not be created due to validation errors'), form
            )
            edit_handler = edit_handler.bind_to_instance(instance=page,
                                                         form=form,
                                                         request=request)
            has_unsaved_changes = True
    else:
        parent_page_json = parent_page.to_json()
        page = page_class.from_json(parent_page_json)
        slug = hashlib.sha224(base64.b64encode(str(time.time()).encode('utf-8'))).hexdigest()
        page.slug = '%s-v%s' % (page.slug, slug[:6])
        page.title = '%s (describe the variant)' % page.title

        signals.init_new_page.send(sender=create, page=page, parent=parent_page)
        form = form_class(instance=page, parent_page=parent_page)
        edit_handler = edit_handler.bind_to_instance(instance=page, form=form, request=request)
        has_unsaved_changes = False

    return render(request, 'wagtailadmin/custom_add_footer.html', {
        'content_type': content_type,
        'page_class': page_class,
        'parent_page': parent_page,
        'edit_handler': edit_handler,
        'preview_modes': page.preview_modes,
        'form': form,
        'next': next_url,
        'has_unsaved_changes': has_unsaved_changes,
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

    if page.specific.is_live:
        page.locked = True

    if request.method == 'POST':
        form = form_class(request.POST, request.FILES, instance=page,
                          parent_page=parent)

        if form.is_valid() and not page.locked and not page.specific.is_live:
            page = form.save(commit=False)

            is_publishing = bool(request.POST.get('action-publish')) and page_perms.can_publish()
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

            # Notifications
            if is_publishing:
                if go_live_at and go_live_at > timezone.now():
                    # Page has been scheduled for publishing in the future

                    if is_reverting:
                        message = _(
                            'Revision from {0} of page \'{1}\' has been scheduled for publishing.'
                        ).format(
                            previous_revision.created_at.strftime('%d %b %Y %H:%M'),
                            page.get_admin_display_title()
                        )
                    else:
                        if page.live:
                            message = _(
                                'Page \'{0}\' is live and this revision has been scheduled for publishing.'
                            ).format(
                                page.get_admin_display_title()
                            )
                        else:
                            message = _(
                                'Page \'{0}\' has been scheduled for publishing.'
                            ).format(
                                page.get_admin_display_title()
                            )

                    messages.success(request, message, buttons=[
                        messages.button(
                            reverse('experiments_oneyouvariant_edit', args=(page.id,)),
                            _('Edit')
                        )
                    ])


                else:
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
                    buttons.append(messages.button(reverse('experiments_oneyouvariant_edit', args=(page_id,)),
                                                   _('Edit')))
                    messages.success(request, message, buttons=buttons)

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
                        reverse('experiments_oneyouvariant_edit', args=(page_id,)),
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
                target_url = reverse('experiments_oneyouvariant_edit', args=[page.id])
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
        form = form_class(instance=page, parent_page=parent)
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

    return render(request, 'wagtailadmin/customer_edit_footer.html', {
        'page': page,
        'page_for_status': page_for_status,
        'content_type': content_type,
        'edit_handler': edit_handler,
        'errors_debug': errors_debug,
        'preview_modes': page.preview_modes,
        'form': form,
        'next': next_url,
        'has_unsaved_changes': has_unsaved_changes,
    })

