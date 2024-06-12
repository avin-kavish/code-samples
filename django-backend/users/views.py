from rest_framework import generics, mixins
from rest_framework.generics import get_object_or_404
from rest_framework import permissions

from django_backend.permissions import IsOwnUserOrReadOnly
from users.models import User
from users.serializers import UserSerializer


class UserList(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset, id=request.user.id)
        return obj

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserDetail(
    mixins.RetrieveModelMixin, mixins.DestroyModelMixin,
    mixins.UpdateModelMixin, generics.GenericAPIView
):
    permissions = [permissions.IsAuthenticatedOrReadOnly, IsOwnUserOrReadOnly]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, partial=True, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
