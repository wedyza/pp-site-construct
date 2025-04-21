from rest_framework.response import Response
from rest_framework import status
from djoser.views import UserViewSet
from rest_framework.views import APIView
from api.serializers import UserLoginSerializer, UserLoginOTPSerializer
from django.contrib.auth import get_user_model
from .utils import generate_otp, send_otp_email
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions

# Create your views here.

User = get_user_model()

class ActivationView(UserViewSet):
    def activation(self, request, *args, **kwargs):
        print(self.kwargs)
        request.data['uid'] = self.kwargs['uid']
        request.data['token'] = self.kwargs['token']
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

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    @swagger_auto_schema(request_body=UserLoginSerializer)
    def post(self, request):
        email = UserLoginSerializer(data=request.data)
        if not email.is_valid():
            return Response({'error': 'Введен неправильный формат почты'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email.data['email'])
        except User.DoesNotExist as e: 
            print(e)

        otp = generate_otp()
        user.otp = otp
        user.save()

        send_otp_email(email.data['email'], otp)

        return Response({'message': 'Письмо с одноразовым кодом отправлено вам на почту'}, status=status.HTTP_200_OK)
    

class ValidateOTPView(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(request_body=UserLoginOTPSerializer)
    def post(self, request):
        payload = UserLoginOTPSerializer(data=request.data)

        if not payload.is_valid():
            return Response({'error': 'Введена неправильная почта, либо введен неправильный формат кода'})
        try:
            user = User.objects.get(email=payload.data['email'])
        except User.DoesNotExist as e:
            # return Response({'error': 'Пользователя с такой почто.'}, status=status.HTTP_404_NOT_FOUND)
            print(e)

        otp = payload.data['otp']
        if user.otp == otp:
            user.otp = None  # Reset the OTP field after successful validation
            user.save()

            # Authenticate the user and create or get an authentication token
            token, _ = Token.objects.get_or_create(user=user)

            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Неправильынй код.'}, status=status.HTTP_400_BAD_REQUEST)