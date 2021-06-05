from rest_framework.request import Request
from api.serializers import CommentSerializer, PostSerializer
from api.models import Comment, Post
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response


class GetPostList(generics.ListCreateAPIView):
    queryset = Post.objects.filter(is_public=True)[:10]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer


class GetPost(APIView):
    def get(self, request: Request, slug: str):
        post = Post.objects.filter(slug=slug).filter(is_public=True)

        if post.exists():
            data = PostSerializer(post[0]).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Post not found': f'Cannot find post with slug: {slug}'}, status=status.HTTP_404_NOT_FOUND)


class GetCommentsList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer


class GetCommentsListFromPost(APIView):
    def get(self, request: Request, id: int):
        post = Post.objects.filter(id=id)

        if post.exists():
            data = PostSerializer(post[0]).data.get('comments')
            if data:
                return Response(data, status=status.HTTP_200_OK)

            return Response({'No comments': f'No comments in post with id: {id}'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Comments not found': f'Cannot find comments in post with id: {id}'}, status=status.HTTP_404_NOT_FOUND)


class GetSingleCommentFromPost(APIView):
    def get(self, request: Request, id: int, comment_id: int):
        post = Post.objects.filter(id=id)

        if post.exists():
            comments = PostSerializer(post[0]).data.get('comments')

            if comments:
                try:
                    data = CommentSerializer(comments[comment_id-1]).data
                    if data:
                        return Response(data, status=status.HTTP_200_OK)
                except IndexError:
                    pass

            return Response({'Comments not found': f'Cannot find comment {comment_id} in post with id: {id}'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Post not found': f'Cannot find post with id: {id}'}, status=status.HTTP_404_NOT_FOUND)
