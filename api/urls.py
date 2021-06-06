from api.views import *
from django.urls import path

urlpatterns = [
    path('posts', GetPostList.as_view()),
    path('posts/recent', GetRecentPostList.as_view()),
    path('posts/<slug:slug>', GetPost.as_view()),
    path('comments', GetCommentsList.as_view()),
    path('<int:id>/comments', GetCommentsListFromPost.as_view()),
    path('<int:id>/comments/<int:comment_id>',
         GetSingleCommentFromPost.as_view()),
]
