from django.urls import path
from .views import BookReviews, ReviewDetails, UserReviews

urlpatterns = [
    path('books/<int:book_id>/reviews', BookReviews.as_view()),
    path('reviews/<int:pk>', ReviewDetails.as_view()),
    path('users/<int:user_id>/reviews', UserReviews.as_view())
]
