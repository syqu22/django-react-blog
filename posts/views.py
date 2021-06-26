from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from posts.models import Post
from posts.serializers import PostSerializer


class PostsList(ListAPIView):
    """
    List of Posts

    Return a list of all **Posts** from database.

    Optional query parameters:\n
    ``recent`` - If ``true`` return only the **4** most recent **Posts**.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        recent = self.request.query_params.get('recent')
        if recent == 'true':
            return Post.objects.all()[:4]

        return Post.objects.all()

    @swagger_auto_schema(responses={200: PostSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PostDetail(APIView):
    """
    Detailed Post

    Return a detailed information about a **Post** with given ``slug``.
    """

    @swagger_auto_schema(responses={200: PostSerializer(), 404: openapi.Response(description='Not Found')})
    def get(self, request: Request, slug: str, format=None):
        post = get_object_or_404(Post, slug=slug)

        data = PostSerializer(post).data
        return Response(data, status=status.HTTP_200_OK)
