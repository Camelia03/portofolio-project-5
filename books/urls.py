from django.urls import path
from .views import BooksList, BookDetail, GenresList, GenreDetail, AuthorDetail, AuthorBooksList

urlpatterns = [
    path('books/', BooksList.as_view()),
    path('books/<int:pk>/', BookDetail.as_view()),
    path('genres/', GenresList.as_view()),
    path('genres/<str:name>/', GenreDetail.as_view()),
    path('authors/<int:pk>/', AuthorDetail.as_view()),
    path('authors/<int:pk>/books', AuthorBooksList.as_view()),
]
