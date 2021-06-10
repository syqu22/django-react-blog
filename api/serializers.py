from rest_framework import serializers
from .models import *


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'title', 'author',
                  'email', 'body', 'created_at', 'post']


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['post_id', 'title', 'author', 'email', 'body']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'slug', 'author', 'thumbnail_url',
                  'body', 'read_time', 'tags', 'created_at']
