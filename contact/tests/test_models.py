from contact.models import Message
from rest_framework.test import APITestCase
from users.models import User


class TestModels(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

    def test_message_model(self):
        """ 
        New Message does not change instance and is saved to Database
        """
        message = Message.objects.create(
            author=self.user, title='Test Title', body='Test comment body')

        self.assertIsInstance(message, Message)
        self.assertEqual(Message.objects.get(title='Test Title'), message)
