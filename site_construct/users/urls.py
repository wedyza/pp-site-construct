from django.urls import path, include
from .views import LoginView, ValidateOTPView, RegisterView, RegisterSellerView
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path("register", csrf_exempt(RegisterView.as_view()), name="registration"),
    path("register_seller", RegisterSellerView.as_view(), name='registration-seller'),
    path("create-otp", csrf_exempt(LoginView.as_view()), name="email-otp-login"),
    path(
        "validate-otp",
        csrf_exempt(ValidateOTPView.as_view()),
        name="email-otp-validate",
    ),
]
