from rest_framework import generics, mixins
from rest_framework.generics import get_object_or_404
from rest_framework import permissions, viewsets

from django_backend.permissions import IsOwnUserOrReadOnly
from users.models import User
from users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    permissions = [permissions.IsAuthenticatedOrReadOnly, IsOwnUserOrReadOnly]
    serializer_class = UserSerializer
    queryset = User.objects.all()

