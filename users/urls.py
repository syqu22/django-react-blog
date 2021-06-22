from django.urls import path

from users.views import (ActivateUser, BlacklistToken, CreateUser,
                         GetCurrentUser)

urlpatterns = [
    path('', GetCurrentUser.as_view()),
    path('register/', CreateUser.as_view()),
    path('logout/', BlacklistToken.as_view()),
    path('activate/<str:token>/', ActivateUser.as_view())
]
