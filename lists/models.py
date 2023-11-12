from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from books.models import Book


# Create your models here.
class List(models.Model):
    name = models.CharField(max_length=255, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False)
    books = models.ManyToManyField(Book)
    