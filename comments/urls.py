from django.urls import path

from comments.views import CommentsList, CreateComment

urlpatterns = [
    path('<slug:slug>/', CommentsList.as_view()),
    path('<slug:slug>/send/', CreateComment.as_view())
]
