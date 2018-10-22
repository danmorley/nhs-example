from __future__ import absolute_import, unicode_literals

from .base import *

DEBUG = False

SECRET_KEY = '#agido7mm*z&+o!dll)erh11&0_$-(y2+kuk3)t7z@6icw&1g^'

try:
    from .local import *
except ImportError:
    pass
