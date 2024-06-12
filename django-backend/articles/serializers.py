from rest_framework import serializers

from articles.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'content', 'is_draft', 'tags',
                  'author', 'created_at', "modified_at"]
