from comments.models import Comment
from rest_framework.test import APITestCase
from users.models import User
from posts.models import Post


class TestModels(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.post = Post.objects.create(title='Test Post', slug='test-post', thumbnail_url='https://www.test.example.com', author=self.user,
                                        body='Test content of the post', read_time=5, is_public=True)

    def test_comment_model(self):
        """ 
        New Comment does not change instance and is saved to Database
        """
        comment = Comment.objects.create(
            post=self.post, author=self.user, body='Test comment body')

        self.assertIsInstance(comment, Comment)
        self.assertEqual(Comment.objects.get(pk=1), comment)
