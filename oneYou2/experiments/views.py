from __future__ import absolute_import, unicode_literals

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
from wagtail.wagtailadmin import messages, signals
from wagtail.wagtailadmin.utils import (
    send_notification)
from wagtail.wagtailadmin.views.pages import get_valid_next_url_from_request
from wagtail.wagtailcore import hooks
from wagtail.wagtailcore.models import Page


class VarientAdminURLHelper(PageAdminURLHelper):
    def get_action_url(self, action, *args, **kwargs):
        if action == 'add':
            url_name = 'experiments_oneyouvariant_add'
            print(args, kwargs)
            target_url = reverse(url_name, args=args, kwargs=kwargs)
            url = '%s?next=%s' % (target_url, urlquote(self.index_url))
            print("URL: ", url)
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
    parent_page_json = parent_page.to_json()
    page = page_class.from_json(parent_page_json)
    slug = hashlib.sha224(str(time.time()).encode('utf-8')).hexdigest()
    page.slug = 'variant-%s-%s' % (page.slug, slug)
    page.page_ref = ""
    page.title = "%s (describe the variant)" % page.title
    edit_handler_class = page_class.get_edit_handler()
    form_class = edit_handler_class.get_form_class(page_class)

    next_url = get_valid_next_url_from_request(request)

    if request.method == 'POST':
        form = form_class(request.POST, request.FILES, instance=page,
                          parent_page=parent_page)

        if form.is_valid():
            page = form.save(commit=False)

            is_publishing = bool(request.POST.get('action-publish')) and parent_page_perms.can_publish_subpage()
            is_submitting = bool(request.POST.get('action-submit'))

            if not is_publishing:
                page.live = False

            # Save page
            parent_page.add_child(instance=page)

            # Save revision
            revision = page.save_revision(
                user=request.user,
                submitted_for_moderation=is_submitting,
            )

            # Publish
            if is_publishing:
                revision.publish()

            # Notifications
            if is_publishing:
                if page.go_live_at and page.go_live_at > timezone.now():
                    messages.success(request, _("Page '{0}' created and scheduled for publishing.").format(
                        page.get_admin_display_title()), buttons=[
                        messages.button(reverse('wagtailadmin_pages:edit', args=(page.id,)), _('Edit'))
                    ])
                else:
                    messages.success(request,
                                     _("Page '{0}' created and published.").format(page.get_admin_display_title()),
                                     buttons=[
                                         messages.button(page.url, _('View live'), new_window=True),
                                         messages.button(reverse('wagtailadmin_pages:edit', args=(page.id,)), _('Edit'))
                                     ])
            elif is_submitting:
                messages.success(
                    request,
                    _("Page '{0}' created and submitted for moderation.").format(page.get_admin_display_title()),
                    buttons=[
                        messages.button(
                            reverse('wagtailadmin_pages:view_draft', args=(page.id,)),
                            _('View draft'),
                            new_window=True
                        ),
                        messages.button(
                            reverse('wagtailadmin_pages:edit', args=(page.id,)),
                            _('Edit')
                        )
                    ]
                )
                if not send_notification(page.get_latest_revision().id, 'submitted', request.user.pk):
                    messages.error(request, _("Failed to send notifications to moderators"))
            else:
                messages.success(request, _("Page '{0}' created.").format(page.get_admin_display_title()))

            for fn in hooks.get_hooks('after_create_page'):
                result = fn(request, page)
                if hasattr(result, 'status_code'):
                    return result

            if is_publishing or is_submitting:
                # we're done here
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
            messages.validation_error(
                request, _("The page could not be created due to validation errors"), form
            )
            edit_handler = edit_handler_class(instance=page, form=form)
            has_unsaved_changes = True
    else:
        print("GET REQUEST")
        print(page)
        print(type(page))

        signals.init_new_page.send(sender=create, page=page, parent=parent_page)
        form = form_class(instance=page, parent_page=parent_page)
        edit_handler = edit_handler_class(instance=page, form=form)
        has_unsaved_changes = False

    return render(request, 'wagtailadmin/pages/create.html', {
        'content_type': content_type,
        'page_class': page_class,
        'parent_page': parent_page,
        'edit_handler': edit_handler,
        'preview_modes': page.preview_modes,
        'form': form,
        'next': next_url,
        'has_unsaved_changes': has_unsaved_changes,
    })
