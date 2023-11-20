from rest_framework import serializers
from .models import Book, Author, Genre


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'description']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'full_name', 'description']


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(read_only=True, many=True)
    genres = GenreSerializer(read_only=True, many=True)
    summary = serializers.SerializerMethodField()

    def get_summary(self, obj):
        if len(obj.description) > 200:
            return obj.description[:200] + '...'

        return obj.description

    class Meta:
        model = Book
        fields = '__all__'
