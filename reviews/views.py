from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .filters import ReviewsFilter
from .models import Comment, Review, Like
from books.models import Book
from .serializers import CommentSerializer, LikeSerializer, ReviewSerializer
from bookworms.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated


class ReviewsList(generics.ListAPIView):
    # queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]
    filterset_class = ReviewsFilter

    def get_queryset(self):
        return Review.objects.annotate(likes_count=Count('likes')).all()


class BookReviews(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None

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
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(owner=self.kwargs.get('user_id')).annotate(
            likes_count=Count('likes'))


class CreateLike(generics.CreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Like.objects.all()


class CommentsList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ReviewComments(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer
    pagination_class = None

    def get_queryset(self):
        review = get_object_or_404(Review, id=self.kwargs.get('review_id'))
        return Comment.objects.filter(review=review).order_by('-created_at')
