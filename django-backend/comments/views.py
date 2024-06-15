from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions

from comments.models import Comment
from comments.serializers import CommentSerializer, CommentCreateSerializer
from django_backend.permissions import IsOwnerOrReadOnly


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly &
        IsOwnerOrReadOnly('creator_id')
    ]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['creator', 'article']

    def get_serializer_class(self):
        if self.action in ["create"]:
            return CommentCreateSerializer
        else:
            return self.serializer_class

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
