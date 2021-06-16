from django.contrib import admin

from contact.models import Message, Topic


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'author', 'created_at')
    list_filter = ('created_at',)
    search_fields = ['email', 'topic', 'title', 'author']


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
    list_filter = ('name',)
    search_fields = ('name',)
