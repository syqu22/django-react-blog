from django.db import models


class Message(models.Model):
    author = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='messages')
    title = models.CharField(max_length=150)
    topics = models.ManyToManyField('contact.Topic')
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id}. {self.title}'


class Topic(models.Model):
    name = models.CharField(max_length=20, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.id}. {self.name}'
