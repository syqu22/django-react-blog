from django.urls import path

from contact.views import CreateMessage

urlpatterns = [
    path('messages/', CreateMessage.as_view()),
]
