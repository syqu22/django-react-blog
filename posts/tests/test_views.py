from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User


class TestViews(APITestCase):

    def setUp(self):
        User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

    def test_anonymous_users_can_see_recent_posts(self):
        res = self.client.get('/api/posts?recent=true/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_anonymous_users_can_see_posts(self):
        res = self.client.get('/api/posts/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_authenticated_users_can_see_recent_posts(self):
        user = User.objects.first()
        self.client.force_login(user)
        self.client.force_authenticate(user=user)

        res = self.client.get('/api/posts?recent=true/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_authenticated_users_can_see_posts(self):
        user = User.objects.first()
        self.client.force_login(user)
        self.client.force_authenticate(user=user)

        res = self.client.get('/api/posts/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_anonymous_users_cannot_do_post_method(self):
        res = self.client.post('/api/posts/', data={
            'title': 'Test post',
            'slug': 'test-post',
            'body': 'Test body',
            'is_public': True
        })

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_users_cannot_do_post_method(self):
        user = User.objects.first()
        self.client.force_login(user)
        self.client.force_authenticate(user=user)

        res = self.client.post('/api/posts/', data={
            'title': 'Test post',
            'slug': 'test-post',
            'author': user.id,
            'body': 'Test body',
            'is_public': True
        })

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
