from posts.views import PostsList, PostDetail, CommentsList, CreateComment
from django.urls import path

urlpatterns = [
    path('', PostsList.as_view()),
    path('<slug:slug>/', PostDetail.as_view()),
    path('<slug:slug>/comments/', CommentsList.as_view()),
    path('<slug:slug>/comments/send/', CreateComment.as_view())
]
