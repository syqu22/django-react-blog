from rest_framework import serializers
from .models import *


class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'title']
