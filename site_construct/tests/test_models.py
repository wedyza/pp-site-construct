from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTest(TestCase):
    def create_user(self, email="some_test_email@mail.ru"):
        return User.objects.create(email=email)
    
    def test_user_creation(self):
        user = self.create_user()
        self.assertTrue(isinstance(user, User)) # creation test
        self.assertEqual(str(user), user.email) # __str__ test
