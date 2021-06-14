from django.db import models
from django.contrib.postgres.fields import ArrayField


class Post(models.Model):
    title = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True, allow_unicode=True)
    author = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='posts')
    thumbnail_url = models.URLField(max_length=400, null=True, blank=True)
    body = models.TextField()
    read_time = models.IntegerField(null=True, blank=True)
    tags = ArrayField(models.CharField(max_length=15),
                      max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id}. {self.title} '


class Comment(models.Model):
    post = models.ForeignKey(
        "api.Post", on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='comments')
    body = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id}. Comment by {self.author}'
