from rest_framework import serializers
from .models import Review
from books.models import Book

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username')
    book_id = serializers.ReadOnlyField(source='book.id')
    book_title =  serializers.ReadOnlyField(source='book.title')

    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Review
        fields = ('id', 'username', 'is_owner', 'updated_at', 'created_at', 'content', 'stars', 'book_id', 'book_title')