from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django_backend.permissions import IsOwnUserOrReadOnly
from users.models import User
from users.serializers import UserSerializer, UserCreateSerializer


class IsCreate(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.method in ['POST']


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsCreate |
        IsAuthenticatedOrReadOnly &
        IsOwnUserOrReadOnly
    ]

    def get_serializer_class(self):
        if self.action in ["create"]:
            return UserCreateSerializer
        else:
            return self.serializer_class

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, **kwargs)
