from rest_framework import serializers
from users.serializers import UserSerializer
from posts.models import Post, Tag


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'thumbnail_url',
                  'body', 'read_time', 'tags', 'created_at']
        read_only_fields = ['author']


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['id', 'name']
