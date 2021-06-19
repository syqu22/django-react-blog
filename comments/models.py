from django.db import models


class Comment(models.Model):

    post = models.ForeignKey(
        'posts.Post', on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='comments')
    body = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id}. Comment by {self.author}'
