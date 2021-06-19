from django.urls import resolve
from rest_framework.test import APITestCase
from users.views import BlacklistToken, CreateUser, GetCurrentUser


class TestUrls(APITestCase):

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
