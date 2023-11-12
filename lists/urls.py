from django.urls import path
from .views import ListCreateLists, ListDetails

urlpatterns = [
    path('lists', ListCreateLists.as_view()),
    path('lists/<int:pk>', ListDetails.as_view()),
]
