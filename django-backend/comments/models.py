from django.db import models


class Comment(models.Model):
    text = models.TextField()

    article = models.ForeignKey('articles.Article', on_delete=models.CASCADE)

    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True)

    creator = models.ForeignKey('users.User', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
