from contact.views import CreateMessage
from django.urls import resolve
from rest_framework.test import APITestCase


class TestUrls(APITestCase):

    def test_comments_list_url(self):
        """
        Url is corresponding to CreateMessage view
        """
        url = resolve('/api/contact/messages/')
        assert url.func.cls == CreateMessage
