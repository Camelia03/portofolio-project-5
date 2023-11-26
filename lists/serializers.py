from rest_framework import serializers
from .models import List
from books.serializers import BookSerializer


class ListSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username')
    # books = BookSerializer(read_only=True, many=True)
    books_count = serializers.SerializerMethodField()

    def get_books_count(self, obj):
        count = obj.books.all().count()
        return count

    class Meta:
        model = List
        fields = ('id', 'username', 'updated_at',
                  'created_at', 'name', 'books_count')


class ListDetailsSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username')
    books = BookSerializer(read_only=True, many=True)

    class Meta:
        model = List
        fields = ('id', 'username', 'updated_at',
                  'created_at', 'name', 'books')
