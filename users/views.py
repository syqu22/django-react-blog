
from rest_framework.request import Request
from rest_framework import status
from users.serializers import CreateUserSerializer
from users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request, format=None):
        serializer = CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = User(username=username, email=email,)
            user.set_password(password)
            user.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


{
    "email": "test@test.pl",
    "username": "mrtest",
    "password": "bobmarley"
}
