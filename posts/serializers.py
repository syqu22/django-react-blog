from rest_framework import serializers
from users.serializers import UserSerializer
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'thumbnail_url',
                  'body', 'read_time', 'tags', 'created_at']
