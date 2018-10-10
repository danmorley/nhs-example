#!/usr/bin/env python
from __future__ import absolute_import, unicode_literals

import os
import sys

if __name__ == '__main__':
    ENV = os.environ.get('CMS_ENV', 'local')
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'oneYou2.settings.{}'.format(ENV))

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
