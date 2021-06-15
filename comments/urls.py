from comments.views import CommentsList, CreateComment
from django.urls import path

urlpatterns = [
    path('<slug:slug>/', CommentsList.as_view()),
    path('<slug:slug>/send/', CreateComment.as_view())
]
