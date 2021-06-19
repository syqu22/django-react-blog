from django.contrib import admin

from comments.models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('body', 'id', 'post',
                    'author', 'created_at')
    list_filter = ('created_at',)
    search_fields = ['author', 'body']
