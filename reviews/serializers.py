from rest_framework import serializers
from .models import Review
from books.models import Book

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'updated_at', 'created_at', 'content', 'stars']