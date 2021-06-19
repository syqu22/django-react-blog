from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.checks import messages
from rest_framework_simplejwt.tokens import OutstandingToken
from users.models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('username', 'id', 'email', 'first_name',
                    'last_name', 'is_active', 'is_staff')
    list_filter = ('created_at', 'is_active', 'is_staff')
    search_fields = ['username', 'email', 'first_name', 'last_name']

    fieldsets = (
        (None, {'fields': ('email', 'username',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff')}),
        ('Personal informations', {
         'fields': ('first_name', 'last_name', 'title')}),
    )
