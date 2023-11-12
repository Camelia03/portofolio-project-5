from django.urls import path
from .views import ListCreateLists

urlpatterns = [
    path('lists', ListCreateLists.as_view()),
]
