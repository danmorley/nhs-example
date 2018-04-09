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


def set_cache_headers(original_function):
    # TODO: you can make this more efficient
    def new_function(*args, **kwargs):
        original_response = original_function(*args, **kwargs)
        # release = get_release_object(kwargs.get('release_uuid'))
        # if not release or release == 'current':
        #     site = get_site_or_404(kwargs['site_identifier'])
        #     release = get_latest_release(site.site.pk)
        # if release.content_status == 1:
        #     original_response['Cache-Control'] = 'max-age=3600'
        return original_response

    return new_function
