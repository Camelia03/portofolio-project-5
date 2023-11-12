from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from books.models import Book


# Create your models here.
class List(models.Model):
    name = models.CharField(max_length=255, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False)
    books = models.ManyToManyField(Book)


def create_default_lists(sender, instance, created, **kwargs):
    if created:
        List.objects.create(owner=instance, name='want-to-read')
        List.objects.create(owner=instance, name='reading')
        List.objects.create(owner=instance, name='read')


post_save.connect(create_default_lists, sender=User)
