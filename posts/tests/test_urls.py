from django.test import TestCase
from django.urls import resolve
from posts.views import PostDetail, PostsList


class TestUrls(TestCase):

    def test_posts_list_url(self):
        """
        Url is corresponding to PostsList view
        """
        url = resolve('/api/posts/')
        assert url.func.cls == PostsList

    def test_post_detail_url(self):
        """
        Url is corresponding to PostDetail view
        """
        url = resolve('/api/posts/test/')
        assert url.func.cls == PostDetail
