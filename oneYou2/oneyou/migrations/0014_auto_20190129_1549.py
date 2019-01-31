# Generated by Django 2.1.4 on 2019-01-29 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dctcmsbase', '0006_footer_header_menu_theme'),
        ('oneyou', '0013_auto_20190129_1236'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='articleoneyoupage',
            name='theme',
        ),
        migrations.RemoveField(
            model_name='oneyoupage',
            name='theme',
        ),
        migrations.RemoveField(
            model_name='recipepage',
            name='theme',
        ),
        migrations.AddField(
            model_name='articleoneyoupage',
            name='page_theme',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articleoneyoupage_pages', to='dctcmsbase.Theme', verbose_name='theme'),
        ),
        migrations.AddField(
            model_name='oneyoupage',
            name='page_theme',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='oneyoupage_pages', to='dctcmsbase.Theme', verbose_name='theme'),
        ),
        migrations.AddField(
            model_name='recipepage',
            name='page_theme',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='recipepage_pages', to='dctcmsbase.Theme', verbose_name='theme'),
        ),
    ]
