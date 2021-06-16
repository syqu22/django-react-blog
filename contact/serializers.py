from rest_framework import serializers
from contact.models import Message, Topic


class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ['id', 'email', 'title', 'topic',
                  'author', 'body', 'created_at']


class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ['id', 'name']
