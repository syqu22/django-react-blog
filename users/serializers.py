from django.core.mail import send_mail
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import User


class CreateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=6, write_only=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

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

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        username = validated_data.get('username', None)
        email = validated_data.get('email', None)
        link = 'TODO'  # TODO

        send_mail(subject='Personal Blog - Activate your account',
                  message=f"Hello {username}, please activate your account by clicking on the link below. \n{link}\nIf it's not you, please ignore this e-mail.",
                  from_email=None,
                  recipient_list=[email],
                  fail_silently=False)

        user = self.Meta.model(**validated_data)

        if password:
            user.set_password(password)

        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name',
                  'title', 'avatar', 'is_staff', 'is_verified']
