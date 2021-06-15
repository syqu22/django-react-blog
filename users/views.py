
from rest_framework.request import Request
from rest_framework import status
from users.serializers import CreateUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


class CurrentUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, format=None):
        user = request.user

        return Response({'username': user.username,
                         'email': user.email,
                         'first_name': user.first_name,
                         'last_name': user.last_name,
                         'title': user.title,
                         'is_staff': user.is_staff,
                         'is_active': user.is_active})


class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request, format=None):
        serializer = CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            # username = serializer.data.get('username')
            # email = serializer.data.get('email')
            # password = serializer.data.get('password')
            # first_name = serializer.data.get('fist_name')
            # last_name = serializer.data.get('last_name')

            # UserManager().create_user(username=username, email=email,
            #                           first_name=first_name, last_name=last_name, password=password)
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistToken(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request: Request, format=None):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
