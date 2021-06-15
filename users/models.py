from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, username: str, email: str, first_name: str, last_name: str, password: str):
        if not username:
            raise ValueError('User needs to have an username')
        if not email:
            raise ValueError('User needs to have an email')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email,
                          first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username: str, email: str, first_name: str, last_name: str, password: str):
        if not username:
            raise ValueError('Superuser needs to have an username')
        if not email:
            raise ValueError('Superuser needs to have an email')

        user = self.create_user(username=username, email=self.normalize_email(email),
                                first_name=first_name, last_name=last_name, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    title = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    is_staff = models.BooleanField(default=False)
    # Change later to false
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.username} - {self.email}'
