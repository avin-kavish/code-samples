from django.contrib import admin

from articles.models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "author", "created_at", "is_draft"]
