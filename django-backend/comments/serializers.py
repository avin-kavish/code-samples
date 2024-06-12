from rest_framework import serializers

from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'article', 'creator', 'parent_comment',
                  'created_at', 'modified_at']
