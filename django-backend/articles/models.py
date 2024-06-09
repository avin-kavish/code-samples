from django.db import models
from users.models import User


class Article(models.Model):
    title = models.CharField(max_length=1000)
    slug = models.CharField(max_length=1000)
    content = models.TextField()
    is_draft = models.BooleanField(default=True)
    tags = models.TextField(array=True)

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
