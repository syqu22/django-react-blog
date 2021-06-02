from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('', include('frontend.urls')),
    path(''. include('leads.urls'))
]
