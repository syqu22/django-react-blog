import tempfile

from django.test.utils import override_settings
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User
from users.utils import email_token_generator, password_reset_token_generator
from django.core.files.images import ImageFile


@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
class TestViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')

        self.uid = urlsafe_base64_encode(force_bytes(self.user.id))
        self.email_token = email_token_generator.make_token(self.user)
        self.password_reset_token = password_reset_token_generator.make_token(
            self.user)

    def authenticate_user(self):
        self.client.force_login(self.user)
        self.client.force_authenticate(user=self.user)

    def generate_image_file(self):
        with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as f:
            image = Image.new('RGBA', (200, 200), (255, 255, 255, 0))
            image.save(f, 'png')

        return open(f.name, mode='rb')

    def generate_wrong_file(self):
        with tempfile.NamedTemporaryFile(suffix='.txt', delete=False) as f:
            f.write(b'Hello world')
        return open(f.name, mode='rb')

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
        self.assertEqual(res.data.get('is_verified'), self.user.is_verified)

    def test_create_user(self):
        """
        Create user
        """
        res = self.client.post('/api/user/register/', data={
            'username': 'othertest',
            'email': 'aleklejawa@gmail.com',
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

    def test_logout(self):
        """
        Unauthenticated user cannot logout
        """
        res = self.client.post('/api/user/logout/', data={
            'refresh_token': 'test',
        })

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_logout_as_auth_user(self):
        """
        Authenticated user can logout
        TODO
        """

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

    def test_login(self):
        """
        Login user with correct credentials
        """
        res = self.client.post('/api/token/', data={
            'username': 'test',
            'password': 'strongpassword'
        })

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data['refresh'])
        self.assertTrue(res.data['access'])

    def test_login_with_wrong_username(self):
        """
        Login user with wrong username
        """
        res = self.client.post('/api/token/', data={
            'username': 'wrongusername',
            'password': 'strongpassword'
        })

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_with_wrong_password(self):
        """
        Login user with wrong password
        """
        res = self.client.post('/api/token/', data={
            'username': 'test',
            'password': 'wrongpassword'
        })

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_send_email_verification(self):
        """
        Send E-Mail verification
        """
        res = self.client.post(
            f'/api/user/verify/{self.user.email}/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_send_email_verification_with_wrong_email(self):
        """
        Send E-Mail verification with wrong User E-Mail
        """
        res = self.client.post(
            '/api/user/verify/wrongemail@test.com/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_activate_user(self):
        """
        Activate User
        """
        res = self.client.post(
            f'/api/user/activate/{self.uid}/{self.email_token}/', follow=True)

        user = User.objects.first()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(user.is_verified)

    def test_activate_user_with_wrong_uid(self):
        """
        Activate User with wrong UID
        """
        uid = urlsafe_base64_encode(force_bytes(5343))
        res = self.client.post(
            f'/api/user/activate/{uid}/{self.email_token}/', follow=True)

        user = User.objects.first()

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertFalse(user.is_verified)

    def test_activate_user_with_wrong_token(self):
        """
        Activate User with wrong Token
        """
        token = 'randomtoken'
        res = self.client.post(
            f'/api/user/activate/{self.uid}/{token}/', follow=True)

        user = User.objects.first()

        self.assertEqual(res.status_code, status.HTTP_406_NOT_ACCEPTABLE)
        self.assertFalse(user.is_verified)

    def test_send_email_password_reset(self):
        """
        Send password reset E-Mail
        """
        res = self.client.post(
            f'/api/user/password/reset/{self.user.email}/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_send_email_password_reset_with_wrong_email(self):
        """
        Send password reset E-Mail with wrong User E-Mail
        """
        res = self.client.post(
            '/api/user/password/reset/wrongemail@test.com/', follow=True)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_change_user_password(self):
        """
        Change User password
        """
        res = self.client.post(
            f'/api/user/password/reset/{self.uid}/{self.password_reset_token}/', data={'password': 'strongpassword', 'new_password': 'newstrongpassword'}, follow=True)

        user = User.objects.first()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(user.check_password('newstrongpassword'))

    def test_change_user_password_with_wrong_uid(self):
        """
        Change User password with wrong UID
        """
        uid = urlsafe_base64_encode(force_bytes(5343))
        res = self.client.post(
            f'/api/user/password/reset/{uid}/{self.password_reset_token}/', data={'password': 'strongpassword', 'new_password': 'newstrongpassword'}, follow=True)

        user = User.objects.first()

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertFalse(user.check_password('newstrongpassword'))

    def test_change_user_password_with_wrong_token(self):
        """
        Change User password with wrong Token
        """
        token = 'randomtoken'
        res = self.client.post(
            f'/api/user/password/reset/{self.uid}/{token}/', data={'password': 'strongpassword', 'new_password': 'newstrongpassword'}, follow=True)

        user = User.objects.first()

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(user.check_password('newstrongpassword'))

    def test_upload_user_avatar(self):
        """
        Upload and change user avatar
        """
        self.authenticate_user()

        avatar = self.generate_image_file()

        res = self.client.post(
            f'/api/user/avatar/', data={'avatar': avatar}, follow=True)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_upload_user_avatar_with_wrong_file(self):
        """
        Upload file with wrong format
        """
        self.authenticate_user()

        wrong_file = self.generate_wrong_file()

        res = self.client.post(
            f'/api/user/avatar/', data={'avatar': wrong_file}, follow=True)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
