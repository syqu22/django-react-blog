from django.db import models
from django.contrib.postgres.fields import ArrayField


class Post(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=400, null=True, blank=True)
    author = models.CharField(max_length=50)
    thumbnail_url = models.URLField(max_length=400, null=True, blank=True)
    body = models.TextField()
    tags = ArrayField(models.CharField(max_length=15),
                      max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    comments = models.ManyToManyField('api.Comment', blank=True)

    def __str__(self):
        return f'{self.id}. Title: {self.title} Author: {self.author}'


class Comment(models.Model):
    username = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=254, null=True, blank=True)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.id}.[{self.confirmed}] Comment by {self.username}'
