import requests

from django.http import StreamingHttpResponse

def api_gateway_portal(request, **kwargs):
    payload = {
        'postcode': request.GET.get('postcode', None),
        'latitude': request.GET.get('latitude', None),
        'longitude': request.GET.get('longitude', None),
    }
    url = 'https://www.nhs.uk/protect-against-stis-use-a-condom/free-condom-finder'
    r = requests.get(url, params=payload, stream=True)
    response = StreamingHttpResponse(
        (chunk for chunk in r.iter_content(512 * 1024)),
        content_type='text/html')
    return response