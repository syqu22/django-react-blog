from rest_framework import serializers
from users.serializers import UserSerializer

from contact.models import Message, Topic


class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ['id', 'name']


class MessageSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    topics = TopicSerializer(many=True)

    class Meta:
        model = Message
        fields = ['id', 'title', 'topics',
                  'author', 'body', 'created_at']
