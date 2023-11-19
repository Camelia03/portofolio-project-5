from django.shortcuts import get_object_or_404, render
from rest_framework import generics, filters
from .models import Book, Genre
from .serializers import BookSerializer, GenreSerializer
from .filters import BookFilter
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class BooksList(generics.ListAPIView):
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer
    filterset_class = BookFilter
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = ('title', 'publish_date')
    ordering = ('-goodreads_average_rating', 'title')


class BookDetail(generics.RetrieveAPIView):
    queryset = Book.objects
    serializer_class = BookSerializer


class GenresList(generics.ListAPIView):
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer

class GenreDetail(generics.RetrieveAPIView):
    serializer_class = GenreSerializer
    lookup_field = 'name'
    queryset = Genre.objects