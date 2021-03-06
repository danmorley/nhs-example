# Generated by Django 2.1.2 on 2018-11-21 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0091_auto_20181114_1506'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipepage',
            name='header_gradient',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='recipepage',
            name='host',
            field=models.CharField(blank=True, choices=[('brightcove', 'Brightcove'), ('wirewax', 'Wirewax')], default=('brightcove', 'Brightcove'), max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='recipepage',
            name='video_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
