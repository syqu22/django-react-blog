from django.urls import path

from users.views import (ActivateUser, BlacklistToken, ChangeUserPassword,
                         CreateUser, DeleteUser, GetCurrentUser, ResetUserPassword, SendEmailDeleteUser,
                         SendEmailPasswordReset, SendEmailVerification,
                         UploadUserAvatar, ChangeUserDetails)

urlpatterns = [
    path('', GetCurrentUser.as_view()),
    path('register/', CreateUser.as_view()),
    path('logout/', BlacklistToken.as_view()),
    path('verify/<str:email>/', SendEmailVerification.as_view()),
    path('activate/<str:uid>/<str:token>/', ActivateUser.as_view()),
    path('password/change/', ChangeUserPassword.as_view()),
    path('password/reset/<str:email>/', SendEmailPasswordReset.as_view()),
    path('password/reset/<str:uid>/<str:token>/', ResetUserPassword.as_view()),
    path('avatar/', UploadUserAvatar.as_view()),
    path('details/', ChangeUserDetails.as_view()),
    path('delete/', SendEmailDeleteUser.as_view()),
    path('delete/<str:uid>/<str:token>/', DeleteUser.as_view())
]
