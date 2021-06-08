from django.urls import path
from django.conf.urls import url
from django.urls.conf import include
from .views import index

urlpatterns = [
    path('api/', include('api.urls')),
    path('', index),
    url(r'^.*/$', index),
]
