from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):
    """Only Django superusers may create/update/delete blog posts."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)
