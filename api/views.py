from datetime import datetime
from rest_framework.request import Request
from api.serializers import CreateCommentSerializer, CommentSerializer, PostSerializer
from api.models import Comment, Post
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS


class PostWritePermission(BasePermission):
    message = 'Only authorized staff can write Posts'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user.is_staff


class PostsList(generics.ListCreateAPIView):
    permission_classes = [PostWritePermission]
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


class CommentsList(APIView):

    def get(self, request: Request, slug: str, format=None):
        post = Post.objects.filter(slug=slug)

        if post.exists():
            comments = Comment.objects.filter(
                post_id=post.first().id)
            data = CommentSerializer(
                comments, many=True).data
            return Response(data, status=status.HTTP_200_OK)

        return Response({'Comments not found': f'Cannot find comments for post with slug: {slug}'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request: Request, slug: str, format=None):
        serializer = CreateCommentSerializer(data=request.data)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if self.request.session.has_key('comment_posted'):
            delta = round((self.request.session['comment_posted'] +
                           60) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before posting another comment.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('comment_posted')

        if serializer.is_valid():
            post = Post.objects.filter(slug=slug)

            if post.exists():
                post = post.first()
                author = serializer.data.get('author')
                body = serializer.data.get('body')

                if not author:
                    author = "Guest"

                comment = Comment(post=post, author=author, body=body)
                comment.save()

                self.request.session['comment_posted'] = datetime.now(
                ).timestamp()

                return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

            return Response({'Post not found': f'Cannot find post with slug: {slug}'}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
