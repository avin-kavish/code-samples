from rest_framework import serializers

from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'article', 'creator', 'parent_comment',
                  'created_at', 'modified_at']


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text', 'article', 'parent_comment']
        extra_kwargs = {
            'text': {'required': True},
            'article': {'required': True},
        }

    def to_representation(self, instance):
        return CommentSerializer(context=self.context).to_representation(
            instance
            )
