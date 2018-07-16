from .base import *

try:
    from .local import *
except ImportError:
    pass

SECRET_KEY = '#agido7mm*z&+o!dll)erh11&0_$-(y2+kuk3)t7z@6icw&1g^'

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
