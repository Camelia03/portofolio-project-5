from rest_framework import serializers
from .models import Book, Author, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'full_name']


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(read_only=True, many=True)
    genres = GenreSerializer(read_only=True, many=True)


    class Meta:
        model = Book
        fields = ['id', 'title', 'authors', 'genres', 'number_of_pages'] 

