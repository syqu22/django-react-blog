
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail

from users.serializers import CreateUserSerializer


class GetCurrentUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, format=None):
        user = request.user
        return Response({'username': user.username,
                         'email': user.email,
                         'first_name': user.first_name,
                         'last_name': user.last_name,
                         'title': user.title,
                         'is_staff': user.is_staff,
                         'is_verified': user.is_verified})


class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request, format=None):

        if not request.user.is_authenticated:
            serializer = CreateUserSerializer(data=request.data)

            if serializer.is_valid():
                user = serializer.save()
                if user:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Forbidden': 'Cannot register user when already logged in.'}, status.HTTP_403_FORBIDDEN)


class ActivateUser(APIView):
    def get(self, request: Request, token: str, uid: str, format=None):
        # TODO activate user email
        return Response(status=status.HTTP_200_OK)


class BlacklistToken(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request: Request, format=None):

        if request.user.is_authenticated:
            try:
                refresh_token = request.data["refresh_token"]
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(status=status.HTTP_200_OK)
            except Exception as e:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_403_FORBIDDEN)
