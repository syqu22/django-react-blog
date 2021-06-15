from posts.views import PostsList, PostDetail
from django.urls import path

urlpatterns = [
    path('', PostsList.as_view()),
    path('<slug:slug>/', PostDetail.as_view()),
]
