from django.shortcuts import get_object_or_404
from books.models import Book
from bookworms.permissions import IsOwnerOrReadOnly
from .serializers import ListSerializer
from .models import List
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

# Create your views here.


class ListCreateLists(generics.ListCreateAPIView):
    queryset = List.objects.all().order_by('name')
    serializer_class = ListSerializer
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ListDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    queryset = List.objects
    serializer_class = ListSerializer


class AddRemoveBook(APIView):
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]

    def post(self, request, *args, **kwargs):
        list = get_object_or_404(List, id=kwargs['pk'])
        book = get_object_or_404(Book, id=kwargs['book_id'])

        list.books.add(book)

        list.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    # def delete(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     # CAREFUL! This could easily delete all the items in this queryset.
    #     queryset.delete()
    #     # You might want some additional checking
    #     return Response(status=status.HTTP_204_NO_CONTENT)
