from rest_framework.response import Response
from rest_framework import status
from djoser.views import UserViewSet
from rest_framework.views import APIView
from api.serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserLoginOTPSerializer,
)
from django.contrib.auth import get_user_model
from .utils import generate_otp, send_otp_email
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils import timezone

# Create your views here.

User = get_user_model()


class ActivationView(UserViewSet):
    def activation(self, request, *args, **kwargs):
        print(self.kwargs)
        request.data["uid"] = self.kwargs["uid"]
        request.data["token"] = self.kwargs["token"]
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        # user.is_verified = True
        user.save()
        super().activation(request, *args, **kwargs)
        return Response(
            {"message": "Account activated successfully!"},
            status=status.HTTP_200_OK,
        )


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(request_body=UserCreateSerializer)
    def post(self, request):
        new_user = UserCreateSerializer(data=request.data)
        if not new_user.is_valid():
            return Response(new_user.errors, status=status.HTTP_400_BAD_REQUEST)
        user = new_user.save()

        otp = generate_otp()
        user.otp = otp
        user.otp_expires = timezone.now() + timezone.timedelta(minutes=15)
        user.save()
        send_otp_email(new_user.data["email"], otp)

        return Response(
            {
                "message": "Письмо с одноразовым кодом отправлено вам на почту. Он действителен в течении 15 минут"
            },
            status=status.HTTP_200_OK,
        )


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(request_body=UserLoginSerializer)
    @csrf_exempt
    def post(self, request):
        email = UserLoginSerializer(data=request.data)
        if not email.is_valid():
            return Response(email.errors)
        try:
            user = User.objects.get(email=email.data["email"])
        except User.DoesNotExist as e:
            return Response(
                {"error": "User is not found"}, status=status.HTTP_404_NOT_FOUND
            )

        otp = generate_otp()
        user.otp = otp
        user.otp_expires = timezone.now() + timezone.timedelta(minutes=15)
        user.save()

        send_otp_email(email.data["email"], otp)

        return Response(
            {
                "message": "Письмо с одноразовым кодом отправлено вам на почту. Он действителен в течении 15 минут"
            },
            status=status.HTTP_200_OK,
        )


class ValidateOTPView(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(request_body=UserLoginOTPSerializer)
    @csrf_exempt
    def post(self, request):
        payload = UserLoginOTPSerializer(data=request.data)

        if not payload.is_valid():
            return Response(payload.errors)
        try:
            user = User.objects.get(email=payload.data["email"])
        except User.DoesNotExist as e:
            print(e)
            return Response(
                {"error": "Пользователя с такой почтой не существует."},
                status=status.HTTP_404_NOT_FOUND,
            )

        otp = payload.data["otp"]
        if user.otp == otp:
            if timezone.now() > user.otp_expires:
                return Response(
                    {"error": "Срок действия пароля истек"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.otp = None
            user.otp_expires = None
            user.save()

            token, _ = Token.objects.get_or_create(user=user)

            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Неправильынй код."}, status=status.HTTP_400_BAD_REQUEST
            )
