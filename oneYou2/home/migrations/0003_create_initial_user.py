# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_create_homepage'),
    ]

    if settings.DATABASES['default']['ENGINE'] == 'sql_server.pyodbc':
        operations = [
                migrations.RunSQL("INSERT INTO auth_user (password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES ('pbkdf2_sha256$36000$qlpsKAFs143l$ssUrFvFEI9bv6HgYjQq2VwNKEuMiFjTIShQonEC++mQ=', '1', 'superadmin', 'superadmin', 'superadmin', 'matt.nicks@methods.co.uk', '1', '1', (SELECT getdate()));"),
        ]
    else:
        operations = [
                migrations.RunSQL("INSERT INTO auth_user (password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES ('pbkdf2_sha256$36000$qlpsKAFs143l$ssUrFvFEI9bv6HgYjQq2VwNKEuMiFjTIShQonEC++mQ=', '1', 'superadmin', 'superadmin', 'superadmin', 'matt.nicks@methods.co.uk', '1', '1', (SELECT NOW()));"),
        ]

