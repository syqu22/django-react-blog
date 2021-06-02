from api.views import *
from django.urls import path

urlpatterns = [
    path('', GetPostList.as_view()),
    path('<int:id>', GetPost.as_view()),
    path('comments', GetCommentsList.as_view()),
    path('<int:id>/comments', GetCommentsListFromPost.as_view()),
    path('<int:id>/comments/<int:comment_id>',
         GetSingleCommentFromPost.as_view()),
]
