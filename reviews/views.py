from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .filters import ReviewsFilter
from .models import Comment, Review, Like
from books.models import Book
from .serializers import CommentSerializer, LikeSerializer, ReviewSerializer
from bookworms.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly, \
    IsAuthenticated


class ReviewsList(generics.ListAPIView):
    """Get all reviews filtered by the owner"""

    serializer_class = ReviewSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]
    filterset_class = ReviewsFilter

    def get_queryset(self):
        return Review.objects.annotate(likes_count=Count('likes')).all()


class BookReviews(generics.ListCreateAPIView):
    """List reviews for a book or create a new one"""

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None  # Disable pagination

    def get_queryset(self):
        """Filter reviews by book id and add no of likes"""
        return Review.objects.filter(book=self.kwargs.get('book_id')).annotate(
            likes_count=Count('likes')).all()

    def perform_create(self, serializer):
        book = Book.objects.get(id=self.kwargs.get('book_id'))

        serializer.save(owner=self.request.user, book=book)


class ReviewDetails(generics.RetrieveUpdateDestroyAPIView):
    """Get, Update or Delete a review as the owner"""

    queryset = Review.objects
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]


class UserReviews(generics.ListAPIView):
    """Get all reviews made by a user"""

    serializer_class = ReviewSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter reviews by the user id and add no of likes"""

        return Review.objects.filter(owner=self.kwargs.get('user_id')).annotate(  # noqa
            likes_count=Count('likes'))


class CreateLike(generics.CreateAPIView):
    """Add a like to a review"""

    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    """Get or delete a like as the owner"""

    serializer_class = LikeSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Like.objects.all()


class CommentsList(generics.ListCreateAPIView):
    """Get all comments or create a new one"""

    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetails(generics.RetrieveUpdateDestroyAPIView):
    """Get, update or delete a comment as the owner"""

    queryset = Comment.objects
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ReviewComments(generics.ListAPIView):
    """Get all comments for a review"""

    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer
    pagination_class = None  # Disable pagination

    def get_queryset(self):
        """Filter reviews by review id and order by creation date DESC"""

        review = get_object_or_404(Review, id=self.kwargs.get('review_id'))
        return Comment.objects.filter(review=review).order_by('-created_at')
