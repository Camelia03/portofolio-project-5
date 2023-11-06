from django.urls import path
from .views import BooksList

urlpatterns = [
    path('books/', BooksList.as_view()),
]