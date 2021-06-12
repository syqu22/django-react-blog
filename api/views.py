from rest_framework.request import Request
from api.serializers import CreateCommentSerializer, CommentSerializer, PostSerializer
from api.models import Comment, Post
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response


class PostsList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get_queryset(self):
        recent = self.request.query_params.get('recent')
        if recent == 'true':
            return Post.objects.filter(is_public=True)[:2]

        return Post.objects.filter(is_public=True)


class PostDetail(APIView):
    authentication_classes = []

    def get(self, request: Request, slug: str, format=None):
        post = Post.objects.filter(slug=slug).filter(is_public=True)

        if post.exists():
            data = PostSerializer(post.first()).data
            return Response(data, status=status.HTTP_200_OK)

        return Response({'Post not found': f'Cannot find post with slug: {slug}'}, status=status.HTTP_404_NOT_FOUND)


class CommentsList(APIView):
    authentication_classes = []

    def get(self, request: Request, slug: str, format=None):

        post = Post.objects.filter(slug=slug).filter(is_public=True)

        if post.exists():
            comments = Comment.objects.filter(
                post_id=post.first().id).filter(is_confirmed=True)
            data = CommentSerializer(
                comments, many=True).data
            return Response(data, status=status.HTTP_200_OK)

        return Response({'Comments not found': f'Cannot find comments for post with slug: {slug}'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request: Request, slug: str, format=None):
        serializer = CreateCommentSerializer(data=request.data)

        if serializer.is_valid():
            post = Post.objects.filter(slug=slug).filter(is_public=True)

            if post.exists():
                post = post.first()
                author = serializer.data.get('author')
                body = serializer.data.get('body')

                if not author:
                    author = "Guest"

                comment = Comment(post=post, author=author, body=body)
                comment.save()

                return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

            return Response({'Post not found': f'Cannot find post with slug: {slug}'}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
