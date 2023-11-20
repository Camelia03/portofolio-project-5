from django.db.models import Count
from rest_framework import generics
from .models import Review, Like
from books.models import Book
from .serializers import LikeSerializer, ReviewSerializer
from bookworms.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class BookReviews(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Review.objects.filter(book=self.kwargs.get('book_id')).annotate(
            likes_count=Count('likes')).all()

    def perform_create(self, serializer):
        book = Book.objects.get(id=self.kwargs.get('book_id'))

        serializer.save(owner=self.request.user, book=book)


class ReviewDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]


class UserReviews(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(owner=self.kwargs.get('user_id'))


class CreateLike(generics.CreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Like.objects.all()
