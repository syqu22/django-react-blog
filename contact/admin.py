from django.contrib import admin

from contact.models import Message


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'author', 'created_at')
    list_filter = ('created_at',)
    search_fields = ['title', 'author']
