from rest_framework import serializers
from .models import *


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'username', 'email', 'body', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'thumbnail_url',
                  'body', 'read_time', 'tags', 'created_at', 'edited_at', 'is_public', 'comments']
