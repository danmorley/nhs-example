# Generated by Django 2.1.2 on 2018-11-07 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shelves', '0032_auto_20181016_1143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actionshelf',
            name='action_code',
            field=models.CharField(default='abc', help_text='Wirewax action code', max_length=255),
            preserve_default=False,
        ),
    ]