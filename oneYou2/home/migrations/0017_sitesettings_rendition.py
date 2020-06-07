# Generated by Django 2.1.2 on 2018-12-03 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0016_sitesettings_adobe_datalayer_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitesettings',
            name='rendition',
            field=models.CharField(choices=[('base', 'Base'), ('all', 'All'), ('oneyou', 'One You'), ('sexhealth', 'Sexual Health')], default='base', max_length=50),
        ),
    ]