from django.core import mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.test import APIRequestFactory, APITestCase
from users.models import User
from users.utils import (delete_acc_token_generator, email_token_generator,
                         password_reset_token_generator,
                         send_email_delete_user, send_email_password_reset,
                         send_email_verification)


class TestUtils(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='test', email='test@test.com', password='strongpassword')
        self.request = APIRequestFactory().request()

    def test_email_token_generator(self):
        """
        Email Token stays the same after It's decoded
        """
        token = email_token_generator.make_token(self.user)
        token_decoded = email_token_generator.check_token(self.user, token)

        self.assertTrue(token_decoded)

    def test_password_reset_token_generator(self):
        """
        Password Reset Token stays the same after It's decoded
        """
        token = password_reset_token_generator.make_token(self.user)
        token_decoded = password_reset_token_generator.check_token(
            self.user, token)

        self.assertTrue(token_decoded)

    def test_delete_acc_token_generator(self):
        """
        Delete Account Token stays the same after It's decoded
        """
        token = delete_acc_token_generator.make_token(self.user)
        token_decoded = delete_acc_token_generator.check_token(
            self.user, token)

        self.assertTrue(token_decoded)

    def test_send_email_verification(self):
        """
        E-mail with email verification is sent with every important information
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

    def test_send_email_password_reset(self):
        """
        E-mail with password reset is sent with every important information
        """
        send_email_password_reset(self.request, self.user)

        email = mail.outbox[0]
        uid = urlsafe_base64_encode(force_bytes(self.user.id))
        token = password_reset_token_generator.make_token(self.user)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(email.to[0], self.user.email)
        self.assertEqual(
            email.subject, 'Personal Blog - Reset your password')
        self.assertIn(self.user.username, email.body)
        self.assertIn(uid, email.body)
        self.assertIn(token, email.body)

    def send_email_delete_user(self):
        """
        E-mail with account removal is sent with every important information
        """
        send_email_delete_user(self.request, self.user)

        email = mail.outbox[0]
        uid = urlsafe_base64_encode(force_bytes(self.user.id))
        token = delete_acc_token_generator.make_token(self.user)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(email.to[0], self.user.email)
        self.assertEqual(
            email.subject, 'Personal Blog - Delete your account')
        self.assertIn(self.user.username, email.body)
        self.assertIn(uid, email.body)
        self.assertIn(token, email.body)
