from rest_framework import serializers
from users.serializers import UserSerializer

from contact.models import Message


class MessageSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'title', 'author', 'body', 'created_at']
