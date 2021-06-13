from contact.views import *
from django.urls import path

urlpatterns = [
    path('messages/', CreateMessage.as_view()),
]
