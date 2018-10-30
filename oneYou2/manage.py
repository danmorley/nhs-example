#!/usr/bin/env python
from __future__ import absolute_import, unicode_literals

import os
import sys

if __name__ == '__main__':
    ENV = os.environ.get('CMS_ENV', 'dev')
    print('MANAGE ENV is {}'.format(ENV))
    if ENV in ['staging', 'prod']:
        print('using oneYou2.settings.production for {}'.format(ENV))
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'oneYou2.settings.production')

    else:
        print('using oneYou2.settings.{}'.format(ENV))
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'oneYou2.settings.{}'.format(ENV))

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
