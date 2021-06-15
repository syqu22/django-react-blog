from rest_framework.request import Request
from posts.serializers import PostSerializer
from posts.models import Post
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response


class PostsList(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        recent = self.request.query_params.get('recent')
        if recent == 'true':
            return Post.objects.all()[:2]

        return Post.objects.all()


class PostDetail(APIView):
    def get(self, request: Request, slug: str, format=None):
        post = Post.objects.filter(slug=slug)

        if post.exists():
            data = PostSerializer(post.first()).data
            return Response(data, status=status.HTTP_200_OK)

        return Response({'Post not found': f'Cannot find post with slug: {slug}'}, status=status.HTTP_404_NOT_FOUND)
