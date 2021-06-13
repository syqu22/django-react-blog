from django.db import models

TOPIC_CHOICES = (
    ('SUGGESTION', 'Suggestion'),
    ('BUG', 'Bug'),
)


class Message(models.Model):
    email = models.EmailField(max_length=254)
    title = models.CharField(max_length=150)
    topic = models.CharField(
        max_length=10, choices=TOPIC_CHOICES, default='SUGGESTION')
    author = models.CharField(max_length=50, blank=True)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id}. {self.title}'
