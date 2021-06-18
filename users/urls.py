from users.views import GetCurrentUser, CreateUser, BlacklistToken
from django.urls import path

urlpatterns = [
    path('', GetCurrentUser.as_view()),
    path('register/', CreateUser.as_view()),
    path('logout/', BlacklistToken.as_view())
]
