from django.http import HttpResponse


class NoReleasesFound(HttpResponse):
    def __init__(self, *args, **kwargs):
        super(NoReleasesFound, self).__init__(*args, **kwargs)
        self.status = 404

