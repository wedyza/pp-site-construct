from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from .functions import user_create_closure
from users.views import RegisterView
from django.urls import reverse
import datetime
import unittest

User = get_user_model()

create_user = user_create_closure()

#seller.views

class RegistrationViewTest(TestCase):
    
    # @unittest.skip("Sending email is async function, that is working with celery worker.")
    @unittest.expectedFailure
    def test_register_valid(self):
        data = {
            'email': "some_example@mail.ru"
        }
        response = self.client.post(reverse('registration'), data)
        self.assertEqual(response.status_code, 200) #pragma: no cover
        self.assertNotEqual(User.objects.get(email='some_example@mail.ru'), None) #pragma: no cover
    
    def test_register_invalid(self): #
        data = {
            'email': "bad email"
        }
        response = self.client.post(reverse('registration'), data)
        self.assertEqual(response.status_code, 400)


class SellerRegistrationViewTest(TestCase):
    # @unittest.skip("Sending email is async function, that is working with celery worker.")
    @unittest.expectedFailure
    def test_register_valid(self):
        data = {
            'email': "some_example@mail.ru"
        }
        response = self.client.post(reverse('registration-seller'), data)
        self.assertEqual(response.status_code, 200) #pragma: no cover
        self.assertNotEqual(User.objects.get(email='some_example@mail.ru'), None) #pragma: no cover
    
    def test_register_invalid(self): #
        data = {
            'email': "bad email"
        }
        response = self.client.post(reverse('registration-seller'), data)
        self.assertEqual(response.status_code, 400)


class LoginViewTest(TestCase):
    def setUp(self):
        self.user = create_user()

    # @unittest.skip("Sending email is async function, that is working with celery worker.")
    def test_validation_pass_login(self):
        data = {
            'email': self.user.email
        }
        response = self.client.post(reverse('email-otp-login'), data)
        self.assertEqual(response.status_code, 200)

    def test_validation_email_fail(self):
        data = {
            'email': "wedyza"
        }
        response = self.client.post(reverse('email-otp-login'), data)
        self.assertEqual(response.status_code, 400)


    def test_validation_fail(self):
        data = {
            'email': "wedyza@mail.ru"
        }
        response = self.client.post(reverse('email-otp-login'), data)
        self.assertEqual(response.status_code, 404)
    

class ValidateOTPViewTest(TestCase):
    def setUp(self):
        self.user= create_user()
        self.user.otp = '123456'
        self.user.otp_expires = datetime.datetime.now() + datetime.timedelta(days=2)
        self.user.save()
    

    def test_no_otp_given(self):
        data = {
            'email': self.user.email
        }
        response = self.client.post(reverse('email-otp-validate'), data)
        self.assertEqual(response.status_code, 400)

    def test_user_not_found(self):
        data = {
            'email': "wedyza@mail.ru",
            "otp": "123123"
        }
        response = self.client.post(reverse('email-otp-validate'), data)
        self.assertEqual(response.status_code, 404)

    def test_user_found_but_fail_otp(self):
        data = {
            'email': self.user.email,
            "otp": "555555"
        }
        response = self.client.post(reverse('email-otp-validate'), data)
        self.assertEqual(response.status_code, 400)

    def test_all_fine(self):
        data = {
            'email': self.user.email,
            "otp": "123456"
        }
        response = self.client.post(reverse('email-otp-validate'), data)
        self.assertEqual(response.status_code, 200)

#api.views
