from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('post/<int:id>', index),
    path('projects', index),
    path('contact', index),
]
