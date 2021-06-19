from contact.models import Message, Topic
from rest_framework.test import APITestCase
from users.models import User


class TestModels(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.topic1 = Topic.objects.create(name='Test topic 1')
        self.topic2 = Topic.objects.create(name='Test topic 2')
        self.topic3 = Topic.objects.create(name='Test topic 3')

    def test_message_model(self):
        """ 
        New Message does not change instance and is saved to Database
        """
        message = Message.objects.create(
            author=self.user, title='Test Title', body='Test comment body')

        message.topics.add(self.topic1)
        message.topics.add(self.topic2)
        message.topics.add(self.topic3)

        self.assertIsInstance(message, Message)
        self.assertEqual(Message.objects.get(title='Test Title'), message)

    def test_topic_model(self):
        """ 
        New Topic does not change instance and is saved to Database
        """
        topic = Topic.objects.create(name='Test topic')

        self.assertIsInstance(topic, Topic)
        self.assertEqual(Topic.objects.get(name='Test topic'), topic)
