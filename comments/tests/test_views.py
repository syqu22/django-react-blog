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

    def test_comments(self):
        """
        User can see comments for public post
        """
        res = self.client.get('/api/comments/test-post/', data={
            'body': 'test'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_comments_as_auth_user(self):
        """
        Authenticated user can see comments for public post
        """
        self.authenticate_user()

        res = self.client.get('/api/comments/test-post/', data={
            'body': 'test'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_comments_for_nonpublic_post(self):
        """
        User cannot see comments for nonpublic post
        """
        res = self.client.get('/api/comments/private-post/', data={
            'body': 'test'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_comments_for_nonpublic_post_as_auth_user(self):
        """
        Authenticated user cannot see comments for nonpublic post
        """
        self.authenticate_user()

        res = self.client.get('/api/comments/private-post/', data={
            'body': 'test'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_send_comment(self):
        """
        Unathenticated user cannot send comments
        """
        res = self.client.post('/api/comments/test-post/send/', data={
            'body': 'test'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_send_comment_as_auth_user(self):
        """
        Authenticated user can send comments
        """
        self.authenticate_user()

        res = self.client.post('/api/comments/test-post/send/', data={
            'body': 'Test comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.get(
            slug='test-post').comments.get(author=self.user).author, self.user)

    def test_send_comment_on_nonpublic_post_as_auth_user(self):
        """
        Authenticated user cannot send comments on nonpublic post
        """
        self.authenticate_user()

        res = self.client.post('/api/comments/private-post/send/', data={
            'body': 'Test comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_send_comment_on_non_existing_post(self):
        """
        User cannot send comments on non existing post
        """

        res = self.client.post('/api/comments/random-site/send/', data={
            'body': 'Test comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_send_comment_on_non_existing_post_as_auth_user(self):
        """
        Authenticated user cannot send comments on non existing post
        """
        self.authenticate_user()

        res = self.client.post('/api/comments/random-site/send/', data={
            'body': 'Test comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_send_many_comments(self):
        """
        Authenticated user cannot send multiple comments in short time window
        """
        self.authenticate_user()

        res = self.client.post('/api/comments/test-post/send/', data={
            'body': 'Test comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        res = self.client.post('/api/comments/test-post/send/', data={
            'body': 'Another comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
