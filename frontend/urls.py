from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('posts', index),
    path('contact', index),
    path('post/<slug:slug>', index),
]
