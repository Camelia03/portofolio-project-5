from django.shortcuts import get_object_or_404
from books.models import Book
from bookworms.permissions import IsOwnerOrReadOnly
from .filters import ListsFilter
from .serializers import ListDetailsSerializer, ListSerializer
from .models import List
from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend


class ListCreateLists(generics.ListCreateAPIView):
    """
    GET - Get all lists of the logged in user
    POST - Create a new list with logged in user as owner
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ListSerializer
    pagination_class = None
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    filterset_class = ListsFilter

    def get_queryset(self):
        return List.objects.filter(owner=self.request.user).order_by('name')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ListDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    GET - Get one list
    PUT, PATCH - Update a list
    DELETE - Delete a list
    Requires the user to be logged in
    """

    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    queryset = List.objects
    serializer_class = ListDetailsSerializer
    pagination_class = None


class AddRemoveBook(APIView):
    """Add or remove a book from a list"""

    # Allow only logged in users
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Add book to a list"""

        list = get_object_or_404(List, id=kwargs['pk'])
        book = get_object_or_404(Book, id=kwargs['book_id'])

        list.books.add(book)

        list.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, *args, **kwargs):
        """Remove a book from a list"""

        list = get_object_or_404(List, id=kwargs['pk'])
        book = get_object_or_404(Book, id=kwargs['book_id'])

        list.books.remove(book)

        list.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
