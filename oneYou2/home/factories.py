from .models import SiteSettings


def create_test_site_settings(title="Test Settings", uid="test_settings", site_id=2):
    site_settings = SiteSettings(title=title, uid=uid, site_id=site_id)
    site_settings.save()
    return site_settings


class SiteSettingsFactory():
    pass

