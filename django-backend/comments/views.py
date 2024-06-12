from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from comments.models import Comment
from comments.serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['creator', 'article']
