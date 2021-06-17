from django.db import models


class Comment(models.Model):

    class CommentObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(is_confirmed=True)

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
