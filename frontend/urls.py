from django.urls import path, re_path, include
from .views import index

urlpatterns = [
    path('api/', include('api.urls')),
    path('api/', include('contact.urls')),
    path('', index),
    re_path(r'^.*/$', index),
]
