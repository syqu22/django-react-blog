from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, username: str, email: str, password: str = None):
        if not username:
            raise TypeError('User needs to have an username')
        if not email:
            raise TypeError('User needs to have an email')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username: str, email: str, password: str = None):
        if not username:
            raise TypeError('Superuser needs to have an username')
        if not email:
            raise TypeError('Superuser needs to have an email')
        if not password:
            raise TypeError('Superuser password cannot be empty')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

    def create_staff(self, username: str, email: str, password: str = None):
        if not username:
            raise TypeError('Staff member needs to have an username')
        if not email:
            raise TypeError('Staff member needs to have an email')
        if not password:
            raise TypeError('Staff member password cannot be empty')

        user = self.create_user(username, email, password)
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.email
