from comments.serializers import CommentSerializer, CreateCommentSerializer
from django.test.testcases import TestCase
from users.models import User


class TestSerializers(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.comment_serializer = CommentSerializer(
            data={'author': self.user, 'body': 'Test Body'})
        self.create_comment_serializer = CreateCommentSerializer(
            data={'body': 'Test Body'})

    def test_comment_serializer(self):
        """
        Comment Serializer
        """
        serializer = self.comment_serializer

        self.assertTrue(serializer.is_valid())

        data = serializer.data

        self.assertCountEqual(
            data.keys(), ['body'])
        self.assertEqual(data['body'], 'Test Body')

    def test_create_comment_serializer(self):
        """
        Create Comment Serializer
        """
        serializer = self.create_comment_serializer

        self.assertTrue(serializer.is_valid())

        data = serializer.data

        self.assertCountEqual(
            data.keys(), ['body'])
        self.assertEqual(data['body'], 'Test Body')
