from django.http import Http404

from home.models import SiteSettings as CustomSite


def get_site_by_id_or_uuid(identifier):
    try:
        try:
            pk = int(identifier)
            return CustomSite.objects.get(pk=pk)
        except ValueError:
            return CustomSite.objects.get(uid=identifier)
    except CustomSite.DoesNotExist:
        return None


def get_site_or_404(identifier):
    site = get_site_by_id_or_uuid(identifier)
    if not site:
        raise Http404("Site Not Found")

    return site
