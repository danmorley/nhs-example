from __future__ import absolute_import, unicode_literals

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
if ENV != 'dev':
    DEBUG = True
else:
    DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '#agido7mm*z&+o!dll)erh11&0_$-(y2+kuk3)t7z@6icw&1g^'


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


try:
    from .local import *
except ImportError:
    pass
