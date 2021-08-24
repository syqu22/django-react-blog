from django.test import TestCase
from django.urls import resolve
from users.views import (ActivateUser, BlacklistToken, ChangeUserDetails,
                         ChangeUserPassword, CreateUser, DeleteUser, GetCurrentUser,
                         ResetUserPassword, SendEmailDeleteUser, SendEmailPasswordReset,
                         SendEmailVerification, UploadUserAvatar)


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

    def test_change_user_password_url(self):
        """
        Url is corresponding to ChangeUserPasswordview
        """
        url = resolve('/api/user/password/change/')
        assert url.func.cls == ChangeUserPassword

    def test_send_email_password_reset_url(self):
        """
        Url is corresponding to SendEmailPasswordReset view
        """
        url = resolve('/api/user/password/reset/email/')
        assert url.func.cls == SendEmailPasswordReset

    def test_reset_user_password_url(self):
        """
        Url is corresponding to ResetUserPassword view
        """
        url = resolve('/api/user/password/reset/uid/token/')
        assert url.func.cls == ResetUserPassword

    def test_upload_user_avatar_url(self):
        """
        Url is corresponding to UploadUserAvatar view
        """
        url = resolve('/api/user/avatar/')
        assert url.func.cls == UploadUserAvatar

    def test_change_user_details_url(self):
        """
        Url is corresponding to ChangeUserDetails view
        """
        url = resolve('/api/user/details/')
        assert url.func.cls == ChangeUserDetails

    def test_send_email_delete_user_url(self):
        """
        Url is corresponding to SendEmailDeleteUser view
        """
        url = resolve('/api/user/delete/')
        assert url.func.cls == SendEmailDeleteUser

    def test_delete_user_url(self):
        """
        Url is corresponding to DeleteUser view
        """
        url = resolve('/api/user/delete/uid/token/')
        assert url.func.cls == DeleteUser
