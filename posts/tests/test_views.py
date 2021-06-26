from posts.models import Post
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User


class TestViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.post = Post.objects.create(title='Test Post', slug='test-post', thumbnail='https://www.test.example.com', author=self.user,
                                        body='Test content of the post', read_time=5, is_public=True)
        self.private_post = Post.objects.create(title='Private Post', slug='private-post', thumbnail='https://www.test.example.com', author=self.user,
                                                body='Test content of the post', read_time=5, is_public=False)

    def authenticate_user(self):
        self.user.is_verified = True
        self.client.force_login(self.user)
        self.client.force_authenticate(user=self.user)

    def test_no_post(self):
        """
        User gets HTTP 404 Not Found if there is no post
        """
        res = self.client.get('/api/comments/some-random-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_no_post_as_auth_user(self):
        """
        Authenticated user gets HTTP 404 Not Found if there is no post
        """
        self.authenticate_user()

        res = self.client.get('/api/comments/some-random-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_nonpublic_post(self):
        """
        User cannot see nonpublic post
        """
        res = self.client.get('/api/comments/private-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_nonpublic_post_as_auth_user(self):
        """
        Authenticated user cannot see nonpublic post
        """
        self.authenticate_user()

        res = self.client.get('/api/comments/private-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_recent_posts(self):
        """
        User can see recent posts
        """
        self.authenticate_user()
        res = self.client.get('/api/posts?recent=true/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_recent_posts_as_auth_user(self):
        """
        Authenticated user can see recent posts
        """
        self.authenticate_user()

        res = self.client.get('/api/posts/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_post(self):
        """
        User cannot create a new post
        """
        res = self.client.post('/api/posts/', data={
            'title': 'Test post',
            'slug': 'test-post',
            'body': 'Test body',
            'is_public': True
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_post_as_auth_user(self):
        """
        Authenticated user cannot create a new post
        """
        self.authenticate_user()

        res = self.client.post('/api/posts/', data={
            'title': 'Test post',
            'slug': 'test-post',
            'author': self.user.id,
            'body': 'Test body',
            'is_public': True
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
