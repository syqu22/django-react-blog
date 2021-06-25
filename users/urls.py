from django.urls import path

from users.views import (ActivateUser, BlacklistToken, CreateUser,
                         GetCurrentUser, SendEmailVerification, UploadUserAvatar)

urlpatterns = [
    path('', GetCurrentUser.as_view()),
    path('register/', CreateUser.as_view()),
    path('logout/', BlacklistToken.as_view()),
    path('verify/<str:email>/', SendEmailVerification.as_view()),
    path('activate/<str:uid>/<str:token>/', ActivateUser.as_view()),
    path('avatar/', UploadUserAvatar.as_view())
]
