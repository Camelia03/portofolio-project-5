from django.urls import path
from .views import AddRemoveBook, ListCreateLists, ListDetails

urlpatterns = [
    path('lists', ListCreateLists.as_view()),
    path('lists/<int:pk>', ListDetails.as_view()),
    path('lists/<int:pk>/books/<int:book_id>', AddRemoveBook.as_view()),
]
