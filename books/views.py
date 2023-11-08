from django.shortcuts import render
from rest_framework import generics, filters
from .models import Book, Genre 
from .serializers import BookSerializer, GenreSerializer
from .filters import BookFilter
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class BooksList(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filterset_class = BookFilter 
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = ('title', 'publish_date')
    ordering = ('-goodreads_average_rating')

class BookDetail(generics.RetrieveAPIView):
    queryset = Book.objects
    serializer_class = BookSerializer

class GenresList(generics.ListAPIView):
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer 