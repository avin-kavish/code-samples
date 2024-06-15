from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from articles.models import Article
from articles.serializers import ArticleSerializer
from django_backend.permissions import IsOwnerOrReadOnly


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly('author_id')
    ]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_draft', 'author', 'slug']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
