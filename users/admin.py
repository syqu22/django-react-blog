from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('username', 'id', 'email', 'first_name',
                    'last_name', 'is_verified', 'is_staff')
    list_filter = ('created_at', 'is_verified', 'is_staff')
    search_fields = ['username', 'email', 'first_name', 'last_name']

    fieldsets = (
        (None, {'fields': ('email', 'username',)}),
        ('Permissions', {'fields': ('is_verified', 'is_staff')}),
        ('Personal informations', {
         'fields': ('first_name', 'last_name', 'title')}),
    )

    # TODO action to disable account by settings is_valid to false
