from django.shortcuts import get_object_or_404
from books.models import Book
from bookworms.permissions import IsOwnerOrReadOnly
from .serializers import ListDetailsSerializer, ListSerializer
from .models import List
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

# Create your views here.


class ListCreateLists(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListSerializer
    pagination_class = None

    def get_queryset(self):
        return List.objects.filter(owner=self.request.user).order_by('name')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ListDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    queryset = List.objects
    serializer_class = ListDetailsSerializer
    pagination_class = None


class AddRemoveBook(APIView):
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]

    def post(self, request, *args, **kwargs):
        list = get_object_or_404(List, id=kwargs['pk'])
        book = get_object_or_404(Book, id=kwargs['book_id'])

        list.books.add(book)

        list.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, *args, **kwargs):
        list = get_object_or_404(List, id=kwargs['pk'])
        book = get_object_or_404(Book, id=kwargs['book_id'])

        list.books.remove(book)

        list.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
