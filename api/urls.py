from api.views import *
from django.urls import path

urlpatterns = [
    path('posts', PostsList.as_view()),
    path('posts/<slug:slug>', PostDetail.as_view()),
    path('posts/<slug:slug>/comments', CommentsList.as_view()),
]
