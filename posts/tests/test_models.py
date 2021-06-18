from rest_framework.test import APITestCase
from posts.models import Post, Tag
from users.models import User


class TestModels(APITestCase):

    def setUp(self):
        User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

    def test_tag_model(self):
        """ 
        Check if the new Tag does not change instance and is saved correctly
        """
        tag = Tag.objects.create(name='Test tag')

        self.assertIsInstance(tag, Tag)
        self.assertEqual(Tag.objects.first(), tag)

    def test_post_model(self):
        """ 
        Check if the new Post does not change instance and is saved correctly
        """
        user = User.objects.first()

        tag1 = Tag.objects.create(name='Tag 1')
        tag2 = Tag.objects.create(name='Tag 2')

        post = Post.objects.create(title='Test Post', slug='test-post', thumbnail_url='https://www.test.example.com', author=user,
                                   body='Test content of the post', read_time=5, is_public=True)
        post.tags.add(tag1)
        post.tags.add(tag2)

        self.assertIsInstance(post, Post)
        self.assertEqual(Post.objects.first().tags.first(), tag1)
        self.assertEqual(Post.objects.first(), post)
