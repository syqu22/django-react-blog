from contact.views import CreateMessage
from django.test import TestCase
from django.urls import resolve


class TestUrls(TestCase):

    def test_comments_list_url(self):
        """
        Url is corresponding to CreateMessage view
        """
        url = resolve('/api/contact/messages/')
        assert url.func.cls == CreateMessage
