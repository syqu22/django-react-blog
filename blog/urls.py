from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)
schema_view = get_schema_view(
    openapi.Info(
        title="Blog API",
        default_version='v1',
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="aleklejawa@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
)


urlpatterns = [
    # Admin
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    # API Docs
    path('api/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
    # Apps
    path('api/posts/', include('posts.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/user/', include('users.urls')),
    # Tokens
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    # Summernote
    path('summernote/', include('django_summernote.urls')),
    # Frontend
    path('', include('frontend.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
