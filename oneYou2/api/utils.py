from django.http import Http404

from home.models import SiteSettings


def get_site_by_id_or_uuid(identifier):
    try:
        pk = int(identifier)
        return SiteSettings.objects.get(pk=pk)
    except ValueError:
        try:
            return SiteSettings.objects.get(uid=identifier)
        except SiteSettings.DoesNotExist:
            return None
    except SiteSettings.DoesNotExist:
        return None


def get_site_or_404(identifier):
    site = get_site_by_id_or_uuid(identifier)
    if not site:
        raise Http404('Site Not Found')

    return site
