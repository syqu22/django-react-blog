from django.db import models
from django.contrib.postgres.fields import ArrayField

from users.models import User


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(is_public=True)

    title = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True, allow_unicode=True)
    author = models.ForeignKey(
        'users.User', on_delete=models.SET_DEFAULT, related_name='posts', default=User.objects.filter(is_superuser=True).first().id)
    thumbnail_url = models.URLField(max_length=400, null=True, blank=True)
    body = models.TextField()
    read_time = models.IntegerField(null=True, blank=True)
    tags = ArrayField(models.CharField(max_length=15),
                      max_length=10, null=True, blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id}. {self.title} '
