from django.contrib import admin, messages

from .models import *


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_public', 'slug',
                    'author', 'edited_at', 'created_at')
    list_filter = ('is_public',)
    search_fields = ['title', 'author']
    prepopulated_fields = {'slug': ('title',)}

    fieldsets = (
        (None, {
            'classes': ('extrapretty',),
            'fields': (
                'title', 'author', 'slug', 'thumbnail_url', 'body', 'read_time', 'is_public', 'tags'
            ),
        }), ('Comments', {
            'classes': ('collapse',),
            'fields': (
                'comments',
            )
        })
    )

    def make_public(modeladmin, request, queryset):
        queryset.update(is_public=True)
        messages.success(
            request, 'Selected Post(s) are now public !')

    def make_unpublic(modeladmin, request, queryset):
        queryset.update(is_public=False)
        messages.success(
            request, 'Selected Post(s) are no longer public!')

    admin.site.add_action(make_public, 'Make public')
    admin.site.add_action(make_unpublic, 'Make unpublic')


class CommentAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')

    def has_add_permission(self, request):
        return False


admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
