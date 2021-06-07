from django.db import models
from django.contrib.postgres.fields import ArrayField


class Post(models.Model):
    title = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True, allow_unicode=True)
    author = models.CharField(max_length=50)
    thumbnail_url = models.URLField(max_length=400, null=True, blank=True)
    body = models.TextField()
    read_time = models.IntegerField(null=True, blank=True)
    tags = ArrayField(models.CharField(max_length=15),
                      max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)
    comments = models.ManyToManyField('api.Comment', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id}. {self.title} '


class Comment(models.Model):
    username = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=254, null=True, blank=True)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.id}.[{self.confirmed}] Comment by {self.username}'
