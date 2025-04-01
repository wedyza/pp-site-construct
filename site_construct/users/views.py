from rest_framework.response import Response
from rest_framework import status
from djoser.views import UserViewSet


# Create your views here.


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
