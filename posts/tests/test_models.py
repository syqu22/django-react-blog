from rest_framework.test import APITestCase
from posts.models import Post
from users.models import User


class TestModels(APITestCase):

    def setUp(self):
        User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

    def test_model(self):
        post = Post.objects.create(title='Test Post', slug='test-post', author=User.objects.first(),
                                   body='Test content of the post', read_time=5, is_public=True)

        self.assertIsInstance(post, Post)
        self.assertEqual(Post.objects.first(), post)
