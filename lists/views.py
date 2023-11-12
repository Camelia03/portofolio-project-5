from .serializers import ListSerializer
from .models import List
from rest_framework import generics

# Create your views here.


class ListCreateLists(generics.ListCreateAPIView):
    queryset = List.objects.all().order_by('name')
    serializer_class = ListSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
