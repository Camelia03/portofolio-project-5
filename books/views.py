from django.shortcuts import render
from rest_framework import generics
from .models import Book, Genre 
from .serializers import BookSerializer, GenreSerializer


# Create your views here.
class BooksList(generics.ListAPIView):
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveAPIView):
    queryset = Book.objects
    serializer_class = BookSerializer

class GenresList(generics.ListAPIView):
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer 