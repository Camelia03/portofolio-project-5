from rest_framework import generics
from .models import Review
from books.models import Book
from .serializers import ReviewSerializer

# Create your views here.
class Reviews(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(book=self.kwargs.get('book_id'))
    
    def perform_create(self, serializer):
        book = Book.objects.get(id=self.kwargs.get('book_id'))

        serializer.save(owner=self.request.user, book=book)
