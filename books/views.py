from django.shortcuts import get_object_or_404, render
from rest_framework import generics, filters
from books.paginations import ClientPagination
from .models import Author, Book, Genre
from .serializers import AuthorSerializer, BookSerializer, GenreSerializer
from .filters import BookFilter
from django_filters.rest_framework import DjangoFilterBackend


class BooksList(generics.ListAPIView):
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer
    filterset_class = BookFilter
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = ('title', 'publish_date', 'goodreads_average_rating')
    ordering = ('-goodreads_average_rating', 'title')
    pagination_class = ClientPagination


class BookDetail(generics.RetrieveAPIView):
    queryset = Book.objects
    serializer_class = BookSerializer


class GenresList(generics.ListAPIView):
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer
    pagination_class = None


class GenreDetail(generics.RetrieveAPIView):
    serializer_class = GenreSerializer
    lookup_field = 'name'
    queryset = Genre.objects


class AuthorDetail(generics.RetrieveAPIView):
    serializer_class = AuthorSerializer
    queryset = Author.objects


class AuthorBooksList(generics.ListAPIView):
    serializer_class = BookSerializer
    pagination_class = ClientPagination

    def get_queryset(self):
        author = get_object_or_404(Author, id=self.kwargs.get('pk'))
        return Book.objects.filter(authors__in=[author])
