# Generated by Django 4.2.6 on 2023-11-21 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0006_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='text',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]