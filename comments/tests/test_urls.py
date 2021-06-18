from rest_framework.test import APITestCase
from django.urls import resolve
from comments.views import CommentsList, CreateComment


class TestUrls(APITestCase):

    def test_comments_list_url(self):
        """
        Check if the url is correctly corresponding to CommentsList view
        """
        url = resolve('/api/comments/test/')
        assert url.func.cls == CommentsList

    def test_create_comment_url(self):
        """
        Check if the url is correctly corresponding to CreateComment view
        """
        url = resolve('/api/comments/test/send/')
        assert url.func.cls == CreateComment
