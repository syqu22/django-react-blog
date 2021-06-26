from comments.models import Comment
from django.test import TestCase
from posts.models import Post
from users.models import User


class TestModels(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.post = Post.objects.create(title='Test Post', slug='test-post', thumbnail='https://www.test.example.com', author=self.user,
                                        body='Test content of the post', read_time=5, is_public=True)

    def test_comment_model(self):
        """ 
        New Comment does not change instance and is saved to Database
        """
        comment = Comment.objects.create(
            post=self.post, author=self.user, body='Test comment body')

        self.assertIsInstance(comment, Comment)
        self.assertEqual(Comment.objects.get(pk=1), comment)
