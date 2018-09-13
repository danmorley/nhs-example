# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-08-27 23:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0031_auto_20180808_0050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='frontend_id',
            field=models.CharField(choices=[('f4d4a21f-0e9c-44f8-b909-f6686a6a24e8', 'v1.5.0\n - Fri, 24 Aug 2018 23:57:42 GMT'), ('b5958ee8-c303-4ab8-82b1-767a3579180e', 'v1.5.0\n - Wed, 22 Aug 2018 19:22:30 GMT'), ('65b714ad-510c-437f-a073-6e4135598ac3', 'v1.4.1\n - Wed, 22 Aug 2018 19:11:28 GMT'), ('c1c0e5db-e75c-4248-bc43-fa79272fb9ba', 'v1.4.0\n - Fri, 17 Aug 2018 11:21:28 GMT'), ('beb268a4-32f2-411e-8cba-0061a61e0319', 'v1.4.0\n - Thu, 16 Aug 2018 16:12:01 GMT'), ('3f53679b-b2a4-4742-8abd-a149b0d4d013', 'v1.4.0\n - Thu, 16 Aug 2018 12:09:21 GMT'), ('75b88352-d4c4-48db-949f-13c9be986b48', 'v1.4.0\n - Tue, 14 Aug 2018 14:46:59 GMT'), ('364985af-8392-49a9-bdd0-aa9a8b218c1e', 'v1.4.0\n - Tue, 14 Aug 2018 12:51:24 GMT'), ('5a1d7e6a-31cf-42a2-abcc-84826c0a2d77', 'v1.4.0\n - Tue, 14 Aug 2018 07:53:27 GMT'), ('7ed5485b-e63f-4189-8ffc-29553ccfb227', 'v1.4.0\n - Mon, 13 Aug 2018 15:49:24 GMT'), ('faf148ae-6e44-4a14-80c4-5a589b980b36', 'v1.4.0\n - Mon, 13 Aug 2018 08:43:46 GMT'), ('5d28b1b2-af5c-4acd-8da1-99a5cc4ed04c', 'v1.4.0\n - Fri, 10 Aug 2018 16:41:47 GMT'), ('caa14d77-7383-47cd-a43d-5c94a9d1911a', 'v1.4.0\n - Fri, 10 Aug 2018 11:51:14 GMT'), ('9a7b8dd6-286f-4b30-bd0d-172aa4f4ac14', 'v1.4.0\n - Fri, 10 Aug 2018 11:04:04 GMT'), ('0d66aaba-fb83-4e76-b2f3-59a46a0423f1', 'v1.4.0\n - Thu, 09 Aug 2018 14:20:14 GMT'), ('de331d40-3e5d-4af2-a424-80992d94309c', 'v1.4.0\n - Wed, 08 Aug 2018 14:43:48 GMT'), ('c3aead68-6611-4254-8e82-5f58a88cf13b', 'v1.4.0\n - Wed, 08 Aug 2018 12:59:48 GMT'), ('57843ec7-423f-45d8-bf67-3aa0cdbc8ebb', 'v1.3.2\n - Wed, 08 Aug 2018 12:49:16 GMT'), ('ae381b76-598f-4820-9934-54b01b57d2c2', 'v1.3.2\n - Wed, 08 Aug 2018 09:21:08 GMT'), ('00303fd7-063a-4155-b78f-0ab10bcbb62f', 'v1.3.1 - Wed, 08 Aug 2018 00:00:18 GMT')], default='f4d4a21f-0e9c-44f8-b909-f6686a6a24e8', max_length=255),
        ),
    ]