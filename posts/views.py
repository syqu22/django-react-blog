from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from posts.models import Post
from posts.serializers import PostSerializer


class PostsList(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        recent = self.request.query_params.get('recent')
        if recent == 'true':
            return Post.objects.all()[:2]

        return Post.objects.all()


class PostDetail(APIView):
    def get(self, request: Request, slug: str, format=None):
        post = get_object_or_404(Post, slug=slug)

        data = PostSerializer(post).data
        return Response(data, status=status.HTTP_200_OK)
