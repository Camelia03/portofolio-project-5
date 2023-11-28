from django.shortcuts import render
from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer
from bookworms.permissions import IsOwnerOrReadOnly


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or Update a profile if you're the owner
    """
    queryset = Profile.objects
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
