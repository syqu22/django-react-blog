from contact.models import Topic
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User


class TestViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.topic1 = Topic.objects.create(name='Test topic 1')
        self.topic2 = Topic.objects.create(name='Test topic 2')

    def authenticate_user(self):
        self.client.force_login(self.user)
        self.client.force_authenticate(user=self.user)

    def test_send_message(self):
        """
        Unathenticated user cannot send messages
        """
        res = self.client.post('/api/contact/messages/', data={
            'title': 'Test title',
            'topics': [self.topic1, self.topic2],
            'body': 'Test message'}, follow=True)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
