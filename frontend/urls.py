from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('<slug:slug>', index),
    path('projects', index),
    path('contact', index),
]
