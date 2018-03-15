from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, redirect
from django.utils.translation import ugettext as _
from django.urls import reverse

from wagtail.wagtailadmin import messages
from wagtail.wagtailadmin.views.pages import get_valid_next_url_from_request
from wagtail.wagtailcore.models import Page, UserPagePermissionsProxy


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
