from django.urls import path
from .views import Reviews, ReviewDetails

urlpatterns = [
    path('books/<int:book_id>/reviews', Reviews.as_view()),
    path('reviews/<int:pk>', ReviewDetails.as_view()),
]