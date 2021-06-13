from django.db.models import fields
from rest_framework import serializers
from .models import *


class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ['id', 'email', 'title', 'topic',
                  'author', 'body', 'created_at']
