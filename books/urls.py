from django.urls import path
from .views import BooksList, BookDetail

urlpatterns = [
    path('books/', BooksList.as_view()),
    path('books/<int:pk>/', BookDetail.as_view()),
]