from django.db import models

# Create your models here.


class Genre(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class Author(models.Model):
    full_name = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.full_name

class Book(models.Model):
    original_title = models.CharField(max_length=255, blank=False)
    title = models.CharField(max_length=255, blank=False)
    image_url = models.CharField(max_length=255, blank=False)
    goodreads_average_rating = models.FloatField(blank=False)
    goodreads_ratings_count = models.IntegerField(blank=False)
    goodreads_book_id = models.CharField(max_length=255, blank=False)
    goodreads_star_rating_1 = models.IntegerField(blank=False)
    goodreads_star_rating_2 = models.IntegerField(blank=False)
    goodreads_star_rating_3 = models.IntegerField(blank=False)
    goodreads_star_rating_4 = models.IntegerField(blank=False)
    goodreads_star_rating_5 = models.IntegerField(blank=False)
    publish_date = models.DateField(blank=False)
    authors = models.ManyToManyField(Author)
    description = models.TextField(blank=False)
    ISBN = models.CharField(max_length=255, blank=False)
    genres = models.ManyToManyField(Genre)
    number_of_pages = models.IntegerField(blank=False)
    language_code = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.title




