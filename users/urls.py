from users.views import *
from django.urls import path

urlpatterns = [
    path('', CurrentUser.as_view()),
    path('register/', CreateUser.as_view()),
    path('logout/', BlacklistToken.as_view())
]
