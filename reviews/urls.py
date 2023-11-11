from django.urls import path
from .views import Reviews

urlpatterns = [
    path('books/<int:book_id>/reviews', Reviews.as_view()),
]