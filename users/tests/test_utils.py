from django.core import mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.test import APIRequestFactory, APITestCase
from users.models import User
from users.utils import email_token_generator, send_email_verification


class TestUtils(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.request = APIRequestFactory().request()

    def test_email_token_generator(self):
        """
        Token is encoded and decoded
        """
        token = email_token_generator.make_token(self.user)
        token_decoded = email_token_generator.check_token(self.user, token)

        self.assertTrue(token_decoded)

    def test_send_email_verification(self):
        """
        E-mail is sent with every important information
        """
        send_email_verification(self.request, self.user)

        email = mail.outbox[0]
        uid = urlsafe_base64_encode(force_bytes(self.user.id))
        token = email_token_generator.make_token(self.user)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(email.to[0], self.user.email)
        self.assertEqual(
            email.subject, 'Personal Blog - Activate your account')
        self.assertIn(self.user.username, email.body)
        self.assertIn(uid, email.body)
        self.assertIn(token, email.body)
