from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.translation import ugettext as _
from django.urls import reverse

from wagtail.admin import messages
from wagtail.admin.forms import CopyForm
from wagtail.admin.utils import user_passes_test, user_has_any_page_permission
from wagtail.admin.views.pages import get_valid_next_url_from_request
from wagtail.core import hooks
from wagtail.core.models import Page, UserPagePermissionsProxy


def unpublish(request, page_id):
    page = get_object_or_404(Page, id=page_id).specific

    user_perms = UserPagePermissionsProxy(request.user)
    if not user_perms.for_page(page).can_unpublish():
        raise PermissionDenied

    next_url = get_valid_next_url_from_request(request)

    if request.method == 'POST':
        include_descendants = request.POST.get("include_descendants", False)

        page.unpublish()

        if include_descendants:
            live_descendant_pages = page.get_descendants().live().specific()
            for live_descendant_page in live_descendant_pages:
                if user_perms.for_page(live_descendant_page).can_unpublish():
                    live_descendant_page.unpublish()

        messages.success(request, _("Page '{0}' unpublished.").format(page.get_admin_display_title()), buttons=[
            messages.button(reverse('wagtailadmin_pages:edit', args=(page.id,)), _('Edit'))
        ])

        page.release_id = request.POST.get("release", False)
        page.save()

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
            print("YYYYY")
            print(page.slug)
            print(page.theme)
            print("NNNN")
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
                    _("Page '{0}' and {1} subpages copied.").format(page.get_admin_display_title(), new_page.get_descendants().count())
                )
            else:
                messages.success(request, _("Page '{0}' copied.").format(page.get_admin_display_title()))

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

