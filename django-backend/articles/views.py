from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from articles.models import Article
from articles.serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_draft', 'author', 'slug']
