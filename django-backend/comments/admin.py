from django.contrib import admin

from comments.models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["id", "article", "summary", "creator", "created_at"]

    def summary(self, obj):
        return obj.text[0:20] + '...'
