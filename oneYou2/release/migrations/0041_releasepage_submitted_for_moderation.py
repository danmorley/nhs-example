# Generated by Django 2.1.2 on 2018-11-09 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0040_auto_20181010_1635'),
    ]

    operations = [
        migrations.AddField(
            model_name='releasepage',
            name='submitted_for_moderation',
            field=models.BooleanField(default=False, verbose_name='submitted for moderation'),
        ),
    ]
