from rest_framework import serializers
from contact.models import Message


class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ['id', 'email', 'title', 'topic',
                  'author', 'body', 'created_at']
