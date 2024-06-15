from rest_framework import permissions


def IsOwnerOrReadOnly(key: str):

    class IsOwnerOrReadOnly(permissions.BasePermission):
        def has_object_permission(self, request, view, obj):
            if request.method in permissions.SAFE_METHODS:
                return True

            return getattr(obj, key) == request.user.id

    return IsOwnerOrReadOnly


class IsOwnUserOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id
