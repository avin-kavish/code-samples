from django.db import models
from django.contrib.postgres.fields import ArrayField

from users.models import User


class Article(models.Model):
    title = models.CharField(max_length=1000)
    slug = models.CharField(max_length=1000)
    content = models.TextField()
    is_draft = models.BooleanField(default=True)
    tags = ArrayField(models.CharField(max_length=100))

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}:{self.title[0:20]}"
