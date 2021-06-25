from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin

from users.models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('username', 'is_active', 'id', 'email', 'first_name',
                    'last_name', 'is_verified', 'is_staff')
    list_filter = ('created_at', 'is_active', 'is_verified', 'is_staff')
    search_fields = ['username', 'email', 'first_name', 'last_name']
    actions = ['desactivate', 'activate']

    fieldsets = (
        (None, {'fields': ('email', 'username', 'avatar')}),
        ('Permissions', {'fields': ('is_verified', 'is_staff')}),
        ('Personal informations', {
         'fields': ('first_name', 'last_name', 'title')}),
    )

    actions = ['activate', 'desactivate', 'verify', 'unverify']

    def activate(modeladmin, request, queryset):
        queryset.update(is_active=True)
        messages.success(
            request, 'Selected User(s) are now activate!')

    def desactivate(modeladmin, request, queryset):
        queryset.update(is_active=False)
        messages.success(
            request, 'Selected User(s) are now desactive!')

    def verify(modeladmin, request, queryset):
        queryset.update(is_verified=True)
        messages.success(
            request, 'Selected User(s) are now verified!')

    def unverify(modeladmin, request, queryset):
        queryset.update(is_verified=False)
        messages.success(
            request, 'Selected User(s) are now unverified!')
