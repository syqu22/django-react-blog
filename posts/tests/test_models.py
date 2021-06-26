from django.test import TestCase
from posts.models import Post, Tag
from users.models import User


class TestModels(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

        self.tag1 = Tag.objects.create(name='Tag 1')
        self.tag2 = Tag.objects.create(name='Tag 2')

    def test_tag_model(self):
        """ 
        New Tag does not change instance and is saved to Database
        """
        tag = Tag.objects.create(name='Test tag')

        self.assertIsInstance(tag, Tag)
        self.assertEqual(Tag.objects.get(name='Test tag'), tag)

    def test_post_model(self):
        """ 
        New Post does not change instance and is saved to Database
        """
        post = Post.objects.create(title='Test Post', slug='test-post', thumbnail='https://www.test.example.com', author=self.user,
                                   body='Test content of the post', read_time=5, is_public=True)
        post.tags.add(self.tag1)
        post.tags.add(self.tag2)

        self.assertIsInstance(post, Post)
        self.assertEqual(Post.objects.get(
            slug='test-post').tags.get(name='Tag 1'), self.tag1)
        self.assertEqual(Post.objects.get(slug='test-post'), post)
