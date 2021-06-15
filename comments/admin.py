from django.contrib import admin, messages
from comments.models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('body', 'is_confirmed', 'id', 'post',
                    'author', 'created_at')
    list_filter = ('is_confirmed', 'created_at')
    search_fields = ['author', 'body']
    actions = ['confirm_comment']

    def confirm_comment(self, request, queryset):
        queryset.update(is_confirmed=True)
        messages.success(
            request, 'Selected Comment(s) are no now visible!')
