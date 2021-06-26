from django.test import TestCase
from django.urls import resolve
from users.views import (ActivateUser, BlacklistToken, CreateUser,
                         GetCurrentUser, ChangeUserPassword,
                         SendEmailPasswordReset, SendEmailVerification,
                         UploadUserAvatar)


class TestUrls(TestCase):

    def test_get_current_user_url(self):
        """
        Url is corresponding to GetCurrentUser view
        """
        url = resolve('/api/user/')
        assert url.func.cls == GetCurrentUser

    def test_create_user_url(self):
        """
        Url is corresponding to CreateUser view
        """
        url = resolve('/api/user/register/')
        assert url.func.cls == CreateUser

    def test_blacklist_token_url(self):
        """
        Url is corresponding to BlacklistToken view
        """
        url = resolve('/api/user/logout/')
        assert url.func.cls == BlacklistToken

    def test_send_email_verification_url(self):
        """
        Url is corresponding to SendEmailVerification view
        """
        url = resolve('/api/user/verify/email/')
        assert url.func.cls == SendEmailVerification

    def test_activate_user_url(self):
        """
        Url is corresponding to ActivateUser view
        """
        url = resolve('/api/user/activate/uid/token/')
        assert url.func.cls == ActivateUser

    def test_send_email_password_reset_url(self):
        """
        Url is corresponding to SendEmailPasswordReset view
        """
        url = resolve('/api/user/password/reset/email/')
        assert url.func.cls == SendEmailPasswordReset

    def test_change_user_password_url(self):
        """
        Url is corresponding to ChangeUserPassword view
        """
        url = resolve('/api/user/password/reset/uid/token/')
        assert url.func.cls == ChangeUserPassword

    def test_upload_user_avatar_url(self):
        """
        Url is corresponding to UploadUserAvatar view
        """
        url = resolve('/api/user/avatar/')
        assert url.func.cls == UploadUserAvatar
