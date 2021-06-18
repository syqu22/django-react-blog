from rest_framework.test import APITestCase
from django.urls import resolve
from posts.views import PostDetail, PostsList


class TestUrls(APITestCase):

    def test_posts_list_url(self):
        url = resolve('/api/posts/')
        assert url.func.cls == PostsList

    def test_post_detail_url(self):
        url = resolve('/api/posts/test/')
        assert url.func.cls == PostDetail
