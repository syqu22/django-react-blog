from django.contrib import admin, messages
from django_summernote.admin import SummernoteModelAdmin

from .models import *


@admin.register(Post)
class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ('body',)
    list_display = ('title', 'is_public', 'slug',
                    'author', 'edited_at', 'created_at')
    list_filter = ('is_public', 'created_at', 'edited_at',)
    search_fields = ['title', 'slug', 'author']
    prepopulated_fields = {'slug': ('title',)}
    actions = ['make_public', 'make_unpublic']

    def make_public(modeladmin, request, queryset):
        queryset.update(is_public=True)
        messages.success(
            request, 'Selected Post(s) are now public !')

    def make_unpublic(modeladmin, request, queryset):
        queryset.update(is_public=False)
        messages.success(
            request, 'Selected Post(s) are no longer public!')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_confirmed', 'post',
                    'author', 'email', 'created_at')
    list_filter = ('is_confirmed', 'created_at')
    search_fields = ['title', 'author', 'email']
    actions = ['confirm_comment']

    def confirm_comment(self, request, queryset):
        queryset.update(is_confirmed=True)
        messages.success(
            request, 'Selected Comment(s) are no now visible!')
