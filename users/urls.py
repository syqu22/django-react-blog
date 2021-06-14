from users.views import *
from django.urls import path

urlpatterns = [
    path('register/', CreateUser.as_view()),
    path('logout/', BlacklistToken.as_view())
]
