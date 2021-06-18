from posts.models import Post
from rest_framework import status
from users.models import User
from rest_framework.test import APITestCase


class TestViews(APITestCase):

    # TODO CORRECT NAMES AND ADD COMMENTS
    # MAYBE ADD MORE ASSERTIONS
    # AND ADD WRAPPER FOR USER AUTHENTICATION

    def setUp(self):
        user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

        Post.objects.create(title='Test Post', slug='test-post', thumbnail_url='https://www.test.example.com', author=user,
                            body='Test content of the post', read_time=5, is_public=True)

    def test_anonymous_user_gets_404_not_found_if_no_post_found(self):
        res = self.client.get('/api/comments/some-random-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_authenticated_user_gets_404_not_found_if_no_post_found(self):
        user = User.objects.first()
        self.client.force_login(user)
        self.client.force_authenticate(user=user)

        res = self.client.get('/api/comments/some-random-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_anonymous_user_correct_post(self):
        res = self.client.get('/api/comments/test-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_authenticated_user_correct_post(self):
        user = User.objects.first()
        self.client.force_login(user)
        self.client.force_authenticate(user=user)

        res = self.client.get('/api/comments/test-post/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_anonymous_user_cannot_post_comments(self):
        res = self.client.post('/api/comments/test-post/send/', data={
            'body': 'test'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_user_can_post_comments(self):
        user = User.objects.first()
        self.client.force_login(user)
        self.client.force_authenticate(user=user)

        res = self.client.post('/api/comments/test-post/send/', data={
            'body': 'Test comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.filter(
            slug='test-post').first().comments.first().author, user)

    def test_authenticated_user_cant_post_comments_random_site(self):
        user = User.objects.first()
        self.client.force_login(user)
        self.client.force_authenticate(user=user)

        res = self.client.post('/api/comments/some-random-post/send/', data={
            'body': 'Test comment'
        }, follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
