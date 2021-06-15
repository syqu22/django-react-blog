from contact.views import CreateMessage
from django.urls import path

urlpatterns = [
    path('messages/', CreateMessage.as_view()),
]
