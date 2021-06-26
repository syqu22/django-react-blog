from datetime import datetime

from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from posts.models import Post
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from comments.models import Comment
from comments.serializers import CommentSerializer, CreateCommentSerializer


class CommentsList(APIView):
    """
    List of Comments

    Return a list of all **Comments** that belong to Post with given ``slug``.
    """

    @swagger_auto_schema(responses={200: CommentSerializer(many=True), 404: openapi.Response(description='Not Found')})
    def get(self, request: Request, slug: str, format=None):
        post = get_object_or_404(Post, slug=slug)

        comments = Comment.objects.filter(post_id=post.id)
        data = CommentSerializer(comments, many=True).data

        return Response(data, status=status.HTTP_200_OK)


class CreateComment(APIView):
    """
    Create Comment

    Create comment under the post with given ``slug``.
    """

    @swagger_auto_schema(request_body=CreateCommentSerializer(), responses={200: CommentSerializer(), 400: openapi.Response(description='Serializer error', examples={'application/json': CreateCommentSerializer().error_messages}), 403: openapi.Response(description='Forbidden'), 404: openapi.Response(description='Not Found'), 429: openapi.Response(description='Too Many Requests')})
    def post(self, request: Request, slug: str, format=None):
        serializer = CreateCommentSerializer(data=request.data)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Stop user from spamming comments
        if self.request.session.has_key('comment_posted'):
            delta = round((self.request.session['comment_posted'] +
                           60) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before sending another comment.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('comment_posted')

        if serializer.is_valid():
            if request.user.is_verified:
                post = get_object_or_404(Post, slug=slug, is_public=True)

                body = serializer.data.get('body')

                comment = Comment(author=request.user, post=post, body=body)
                comment.save()

                self.request.session['comment_posted'] = datetime.now(
                ).timestamp()

                return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

            return Response({'detail': 'Please activate your account first.'}, status=status.HTTP_403_FORBIDDEN)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
