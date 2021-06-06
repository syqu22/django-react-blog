from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('projects', index),
    path('contact', index),
    path('post/<slug:slug>', index),
]
