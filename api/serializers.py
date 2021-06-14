from django.db.models.fields import CharField
from rest_framework import serializers
from users.serializers import UserSerializer
from .models import *


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'author', 'body', 'created_at']


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['post_id', 'body']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'thumbnail_url',
                  'body', 'read_time', 'tags', 'created_at']
