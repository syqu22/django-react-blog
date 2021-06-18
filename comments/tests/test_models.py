from comments.models import Comment
from rest_framework.test import APITestCase
from users.models import User
from posts.models import Post


class TestModels(APITestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        Post.objects.create(title='Test Post', slug='test-post', thumbnail_url='https://www.test.example.com', author=user,
                            body='Test content of the post', read_time=5, is_public=True)

    def test_comment_model(self):
        """ 
        Check if the new Comment does not change instance and is saved correctly
        """
        post = Post.objects.first()
        author = User.objects.first()

        comment = Comment.objects.create(
            post=post, author=author, body='Test comment body')

        self.assertIsInstance(comment, Comment)
        self.assertEqual(Comment.objects.first(), comment)
