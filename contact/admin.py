from django.contrib import admin

from .models import *


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'author', 'created_at')
    list_filter = ('title', 'topic', 'created_at')
    search_fields = ['email', 'topic', 'title', 'author']