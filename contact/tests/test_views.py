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

    def test_send_message(self):
        """
        Unathenticated user cannot send messages
        """
        res = self.client.post('/api/contact/messages/', data={
            'title': 'Test title',
            'body': 'Test message'}, follow=True)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_send_message_as_auth_user(self):
        """
        Unathenticated user cannot send messages
        """
        self.authenticate_user()

        res = self.client.post('/api/contact/messages/', data={
            'title': 'Test title',
            'body': 'Test message'}, follow=True)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
