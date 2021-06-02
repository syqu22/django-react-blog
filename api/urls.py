from api.views import *
from django.urls import path

urlpatterns = [
    path('posts/', PostList.as_view()),
    path('posts/<int:id>', PostDetail.as_view())
]
