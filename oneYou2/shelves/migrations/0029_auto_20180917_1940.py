# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-09-17 18:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shelves', '0028_auto_20180917_1305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actionshelf',
            name='category',
            field=models.CharField(choices=[('Be more active', 'Be more active'), ('Stay connected', 'Stay connected'), ('Reframing unhelpful thoughts', 'Reframing unhelpful thoughts'), ('Being in the present ', 'Being in the present'), ('Get good sleep', 'Get good sleep'), ('Take control', 'Take control'), ('Healthy living', 'Healthy living'), ('Take action on my worries', 'Take action on my worries'), ('Do something for myself', 'Do something for myself'), ('Get help and support', 'Get help and support')], max_length=255),
        ),
    ]