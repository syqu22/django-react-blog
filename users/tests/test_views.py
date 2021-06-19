from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User


class TestViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

    def authenticate_user(self):
        self.client.force_login(self.user)
        self.client.force_authenticate(user=self.user)

    def test_user_info(self):
        """
        Not authenticated user cannot access User informations
        """
        res = self.client.get('/api/user/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_info_as_auth_user(self):
        """
        Authenticated user can see his own User informations
        """
        self.authenticate_user()

        res = self.client.get('/api/user/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data.get('username'), self.user.username)
        self.assertEqual(res.data.get('email'), self.user.email)
        self.assertEqual(res.data.get('first_name'), self.user.first_name)
        self.assertEqual(res.data.get('last_name'), self.user.last_name)
        self.assertEqual(res.data.get('title'), self.user.title)
        self.assertEqual(res.data.get('is_staff'), self.user.is_staff)
        self.assertEqual(res.data.get('is_active'), self.user.is_active)

    def test_create_user(self):
        """
        Create user
        """
        res = self.client.post('/api/user/register/', data={
            'username': 'othertest',
            'email': 'test@othermail.com',
            'password': 'verystrongpassword'
        })

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='othertest').first())

    def test_create_user_as_auth_user(self):
        """
        Authenticated user cannot create another account
        """
        self.authenticate_user()

        res = self.client.post('/api/user/register/', data={
            'username': 'othertest',
            'email': 'test@othermail.com',
            'password': 'verystrongpassword'
        })

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(User.objects.filter(username='othertest').first())

    def test_create_user_with_the_same_username(self):
        """
        Create user with existing username
        """
        res = self.client.post('/api/user/register/', data={
            'username': 'test',
            'email': 'test@othermail.com',
            'password': 'verystrongpassword'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_with_the_same_email(self):
        """
        Create user with existing email
        """
        res = self.client.post('/api/user/register/', data={
            'username': 'othertest',
            'email': 'test@test.com',
            'password': 'verystrongpassword'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_with_weak_password(self):
        """
        Create user with too short password
        """
        res = self.client.post('/api/user/register/', data={
            'username': 'othertest',
            'email': 'test@othertest.com',
            'password': 'pass'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
