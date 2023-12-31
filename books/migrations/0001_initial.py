# Generated by Django 4.2.6 on 2023-11-06 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_title', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('image_url', models.CharField(max_length=255)),
                ('goodreads_average_rating', models.FloatField()),
                ('goodreads_ratings_count', models.IntegerField()),
                ('goodreads_book_id', models.CharField(max_length=255)),
                ('goodreads_star_rating_1', models.IntegerField()),
                ('goodreads_star_rating_2', models.IntegerField()),
                ('goodreads_star_rating_3', models.IntegerField()),
                ('goodreads_star_rating_4', models.IntegerField()),
                ('goodreads_star_rating_5', models.IntegerField()),
                ('publish_date', models.DateField()),
                ('description', models.TextField()),
                ('ISBN', models.CharField(max_length=255)),
                ('number_of_pages', models.IntegerField()),
                ('language_code', models.CharField(max_length=255)),
                ('genre', models.ManyToManyField(to='books.genre')),
            ],
        ),
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255)),
                ('published_books', models.ManyToManyField(to='books.book')),
            ],
        ),
    ]
