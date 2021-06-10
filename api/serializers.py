from rest_framework import serializers
from .models import *


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'title', 'author', 'body', 'created_at']


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['post_id', 'title', 'author', 'body']


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'thumbnail_url',
                  'body', 'read_time', 'tags', 'created_at']
