import tempfile
from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test.testcases import TestCase
from django.test.utils import override_settings
from PIL import Image
from users.models import User
from users.serializers import (AvatarSerializer, CreateUserSerializer,
                               UserPasswordSerializer,
                               UserPersonalDetailsSerializer, UserSerializer)


def generate_image_file():
    image = BytesIO()
    Image.new('RGB', (200, 200)).save(image, 'png')
    image.seek(0)
    return SimpleUploadedFile('test_avatar.png', image.getvalue(), content_type='image/png')


@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
class TestSerializers(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.avatar = generate_image_file()
        self.user_serializer = UserSerializer(data={'username': 'testusername', 'first_name': 'Test',
                                                    'last_name': 'Testing', 'title': 'testtitle', 'avatar': self.avatar, 'is_staff': False, 'is_verified': True})
        self.user_password_serializer = UserPasswordSerializer(
            data={'password': 'strongpassword', 'new_password': 'evenstrongerpassword'})
        self.avatar_serializer = AvatarSerializer(
            data={'avatar': self.avatar})
        self.create_user_serializer = CreateUserSerializer(
            data={'username': 'testusername', 'email': 'testemail@example.com', 'password': 'strongpassword', 'first_name': 'Test', 'last_name': 'Tested'})
        self.user_personal_details_serializer = UserPersonalDetailsSerializer(
            data={'username': 'testusername', 'email': 'testemail@example.com',
                  'first_name': 'Test', 'last_name': 'Tested'})

    def test_user_serializer(self):
        """
        User serializer
        """
        serializer = self.user_serializer

        self.assertTrue(serializer.is_valid())

        data = serializer.data

        self.assertCountEqual(data.keys(), [
                              'username', 'first_name', 'last_name', 'title', 'avatar', 'is_staff', 'is_verified'])
        self.assertEqual(data['username'], 'testusername')
        self.assertEqual(data['first_name'], 'Test')
        self.assertEqual(data['last_name'], 'Testing')
        self.assertEqual(data['title'], 'testtitle')
        self.assertFalse(data['is_staff'])
        self.assertTrue(data['is_verified'])

    def test_user_password_serializer(self):
        """
        User Password serializer
        """
        serializer = self.user_password_serializer

        self.assertTrue(serializer.is_valid())

        data = serializer.data

        self.assertCountEqual(data.keys(), ['password', 'new_password'])
        self.assertEqual(data['password'], 'strongpassword')
        self.assertEqual(data['new_password'], 'evenstrongerpassword')

    def test_user_password_serializer_password(self):
        """
        Passwords cannot be the same
        """
        serializer = self.user_password_serializer

        serializer.initial_data['new_password'] = 'strongpassword'
        self.assertFalse(serializer.is_valid())

    def test_user_password_serializer_new_password(self):
        """
        New password needs to be at least 6 characters long
        """
        serializer = self.user_password_serializer

        serializer.initial_data['new_password'] = '1234'
        self.assertFalse(serializer.is_valid())

    def test_avatar_serializer(self):
        """
        Avatar Serializer
        """
        serializer = self.avatar_serializer

        self.assertTrue(serializer.is_valid())

        data = serializer.data

        self.assertCountEqual(data.keys(), ['avatar'])

    def test_create_user_serializer(self):
        """
        Create User serializer
        """
        serializer = self.create_user_serializer

        self.assertTrue(serializer.is_valid())

        data = serializer.data

        self.assertCountEqual(
            data.keys(), ['username', 'email', 'first_name', 'last_name'])
        self.assertEqual(data['username'], 'testusername')
        self.assertEqual(data['email'], 'testemail@example.com')
        self.assertEqual(data['first_name'], 'Test')
        self.assertEqual(data['last_name'], 'Tested')

    def test_create_user_serializer_username(self):
        """
        Username has to be unique
        """
        serializer = self.create_user_serializer

        serializer.initial_data['username'] = 'test'
        self.assertFalse(serializer.is_valid())

    def test_create_user_serializer_email(self):
        """
        E-Mail has to be unique
        """
        serializer = self.create_user_serializer

        serializer.initial_data['email'] = 'test@test.com'
        self.assertFalse(serializer.is_valid())

    def test_create_user_serializer_password(self):
        """
        Password needs to be at least 6 characters long
        """
        serializer = self.create_user_serializer

        serializer.initial_data['password'] = 'six'
        self.assertFalse(serializer.is_valid())

    def test_create_user_serializer_save(self):
        """
        Save User object from Create User Serializer
        """
        serializer = self.create_user_serializer

        self.assertTrue(serializer.is_valid())

        user = serializer.save()
        query_user = User.objects.filter(
            username=serializer.data['username'])

        self.assertTrue(query_user.exists())
        self.assertEqual(user, query_user.first())

    def test_user_personal_details_serializer(self):
        """
        User Personal Details serializer
        """
        serializer = self.user_personal_details_serializer

        self.assertTrue(serializer.is_valid())

        data = serializer.data

        self.assertCountEqual(
            data.keys(), ['username', 'email', 'first_name', 'last_name']
        )
        self.assertEqual(data['username'], 'testusername')
        self.assertEqual(data['email'], 'testemail@example.com')
        self.assertEqual(data['first_name'], 'Test')
        self.assertEqual(data['last_name'], 'Tested')
