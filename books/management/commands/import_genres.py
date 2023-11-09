from typing import Any
from django.core.management import BaseCommand
from books.models import Genre


official_genres = {"art", "biography", "business", "chick-lit", "children's", "christian", "classics",
          "comics", "contemporary", "cookbooks", "crime", "books", "fantasy", "fiction",
          "gay-and-lesbian", "graphic-novels", "historical-fiction", "history", "horror",
          "humor-and-comedy", "manga", "memoir", "music", "mystery", "nonfiction", "paranormal",
          "philosophy", "poetry", "psychology", "religion", "romance", "science", "science-fiction", 
          "self-help", "suspense", "spirituality", "sports", "thriller", "travel", "young-adult"}

class Command(BaseCommand):
    def handle(self, *args, **options):
        for genre in official_genres:
            if not Genre.objects.filter(name=genre).exists():
                Genre.objects.create(name=genre)
        