from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import User


class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=3, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=6, write_only=True)
    first_name = serializers.CharField(
        min_length=3, required=False, allow_blank=True)
    last_name = serializers.CharField(
        min_length=3, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def validate_username(self, value):
        username = self.get_initial().get('username')

        if User.objects.filter(username=username).exists():
            raise ValidationError('This Username is already taken.')

        return value

    def validate_email(self, value):
        email = self.get_initial().get('email')

        if User.objects.filter(email=email).exists():
            raise ValidationError('This E-Mail is already taken.')

        return value

    def validate_password(self, value):
        password = self.get_initial().get('password')

        if len(password) < 6:
            raise ValidationError(
                'Password needs to be at least 6 characters long.')

        return value

    def create(self, validated_data):
        password = validated_data.pop('password', None)

        user = self.Meta.model(**validated_data)

        if password:
            user.set_password(password)

        user.save()
        return user


class AvatarSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['avatar']


class UserPasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['password', 'new_password']

    def validate_password(self, value):
        password = self.get_initial().get('password')
        new_password = self.get_initial().get('new_password')

        if password == new_password:
            raise ValidationError(
                'Passwords cannot be the same.')

        return value

    def validate_new_password(self, value):
        new_password = self.get_initial().get('new_password')

        if len(new_password) < 6:
            raise ValidationError(
                'New password needs to be at least 6 characters long.')

        return value


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name',
                  'title', 'avatar', 'is_staff', 'is_verified']


class UserPersonalDetailsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=3, allow_blank=True)
    email = serializers.EmailField(allow_blank=True)
    first_name = serializers.CharField(min_length=3, allow_blank=True)
    last_name = serializers.CharField(min_length=3, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
