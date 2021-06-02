from rest_framework.request import Request
from api.serializers import PostSerializer
from api.models import Post
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
