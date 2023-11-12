from bookworms.permissions import IsOwnerOrReadOnly
from .serializers import ListSerializer
from .models import List
from rest_framework import generics

# Create your views here.


class ListCreateLists(generics.ListCreateAPIView):
    queryset = List.objects.all().order_by('name')
    serializer_class = ListSerializer
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ListDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = List.objects
    serializer_class = ListSerializer
