from django.test import TestCase
from api.permissions import AdminOrReadOnly, IsBuyer, IsSeller, IsSellerOrAdmin, OwnerOrReadOnly
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory
from api.models import GoodItem
from .functions import user_create_closure

User = get_user_model()

create_user = user_create_closure()

class TestAdminOrReadOnlyPermissions(TestCase):
    def setUp(self):
        self.permission = AdminOrReadOnly()
        self.user = create_user()
        self.admin = create_user("Администратор")
        self.factory = APIRequestFactory()
    
    def test_admin_tries_to_request(self):
        request = self.factory.delete('/')
        request.user = self.admin

        permission = self.permission.has_permission(request, None)
        self.assertTrue(permission)

    def test_returns_true_on_safe_method(self):
        request = self.factory.get('/')
        request.user = self.user

        permission = self.permission.has_permission(request, None)
        self.assertTrue(permission)

    def test_user_tries_to_request(self):
        request = self.factory.delete('/')
        request.user = self.user

        permission = self.permission.has_permission(request, None)
        self.assertFalse(permission)


class TestOwnerOrReadOnlyPermission(TestCase):
    def setUp(self):
        self.owner = create_user()
        self.not_owner = create_user()
        self.permission = OwnerOrReadOnly()
        self.item = GoodItem.objects.create(name='', description='', user=self.owner)
        self.factory = APIRequestFactory()

    def test_returns_true_on_safe_method(self):
        request = self.factory.get(f'/goods/{self.item.id}/')
        request.user = self.not_owner

        permission = self.permission.has_permission(request, None)
        return self.assertTrue(permission)
    
    def test_returns_false_when_not_owner_trying_to_access_object(self):
        request = self.factory.delete(f'/goods/{self.item.id}/')
        request.user = self.not_owner

        permission = self.permission.has_object_permission(request, None, self.item)
        return self.assertFalse(permission)
    
    def test_returns_true_when_owner_trying_to_access_object(self):
        request = self.factory.delete(f'/goods/{self.item.id}/')
        request.user = self.owner

        permission = self.permission.has_object_permission(request, None, self.item)
        return self.assertTrue(permission)


class TestIsSellerPermission(TestCase):
    def setUp(self):
        self.seller = create_user("Продавец")
        self.not_seller = create_user()
        self.permission = IsSeller()
        self.factory = APIRequestFactory()
    
    def test_true_on_seller(self):
        request = self.factory.get('/')
        request.user = self.seller

        permission = self.permission.has_permission(request, None)
        self.assertTrue(permission)
    
    def test_false_on_not_seller(self):
        request = self.factory.delete('/')
        request.user = self.not_seller

        permission = self.permission.has_permission(request, None)
        self.assertFalse(permission)


class TestIsBuyerPermission(TestCase):
    def setUp(self):
        self.not_buyer = create_user("Продавец")
        self.buyer = create_user()
        self.permission = IsBuyer()
        self.factory = APIRequestFactory()
    
    def test_true_on_buyer(self):
        request = self.factory.get('/')
        request.user = self.buyer

        permission = self.permission.has_permission(request, None)
        self.assertTrue(permission)
    
    def test_false_on_not_buyer(self):
        request = self.factory.delete('/')
        request.user = self.not_buyer

        permission = self.permission.has_permission(request, None)
        self.assertFalse(permission)


class TestIsSellerOrAdminPermission(TestCase):
    def setUp(self):
        self.seller = create_user("Продавец")
        self.buyer = create_user()
        self.admin = create_user("Администратор")
        self.permission = IsSellerOrAdmin()
        self.factory = APIRequestFactory()
    
    def test_false_on_buyer(self):
        request = self.factory.get('/')
        request.user = self.buyer

        permission = self.permission.has_permission(request, None)
        self.assertFalse(permission)
    
    def test_true_on_seller(self):
        request = self.factory.delete('/')
        request.user = self.seller

        permission = self.permission.has_permission(request, None)
        self.assertTrue(permission)

    def test_true_on_admin(self):
        request = self.factory.delete('/')
        request.user = self.admin

        permission = self.permission.has_permission(request, None)
        self.assertTrue(permission)