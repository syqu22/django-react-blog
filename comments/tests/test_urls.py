from comments.views import CommentsList, CreateComment
from django.test import TestCase
from django.urls import resolve


class TestUrls(TestCase):

    def test_comments_list_url(self):
        """
        Url is corresponding to CommentsList view
        """
        url = resolve('/api/comments/test/')
        assert url.func.cls == CommentsList

    def test_create_comment_url(self):
        """
        Url is corresponding to CreateComment view
        """
        url = resolve('/api/comments/test/send/')
        assert url.func.cls == CreateComment
