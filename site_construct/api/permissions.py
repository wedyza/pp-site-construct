from rest_framework import permissions
from users.models import CustomAbstractUser


class AdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS
            or request.user.user_type == "Администратор"
        )


class OwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS
            or request.user.is_authenticated
            or request.user.is_superuser
        )

    def has_object_permission(self, request, view, obj):  # добавить user к товару
        return obj.user == request.user


class AdminOrModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.user_type == CustomAbstractUser.UserType.ADMIN
            or request.user.user_type == CustomAbstractUser.UserType.MODERATOR
        )


class Owner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user


class SellerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS or request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return request.user.user_type == CustomAbstractUser.UserType.SELLER


class IsBuyer(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.user_type == CustomAbstractUser.UserType.BUYER
        )

class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.user_type == CustomAbstractUser.UserType.SELLER
        )
