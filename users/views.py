from datetime import datetime

from django.shortcuts import get_object_or_404
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import User
from users.serializers import CreateUserSerializer
from users.utils import email_token_generator, send_email_verification


class GetCurrentUser(APIView):
    """
    Current User

    Return an information about the current logged in user.\n
    """

    response_schema_dict = {
        '200': openapi.Response(
            description='Ok',
            examples={
                'application/json': {
                    'username': 'test_user',
                    'email': 'test@example.com',
                    'first_name': 'Foo',
                    'last_name': 'Bar',
                    'title': 'HTML Specialist',
                    'is_staff': True,
                    'is_verified': True}
            }
        ),
        '403': openapi.Response(
            description='Unauthorized',
            examples={
                'application/json': {
                    "detail": 'Authentication credentials were not provided.',
                }
            }
        ),
    }

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses=response_schema_dict)
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
                    send_email_verification(request, user)

                    return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Forbidden': 'Cannot register user when already logged in.'}, status.HTTP_403_FORBIDDEN)


class SendEmailVerification(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request, email: str, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Stop user from spamming email verification
        if self.request.session.has_key('verification_email_sent'):
            delta = round((self.request.session['verification_email_sent'] +
                           300) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before posting another request.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('verification_email_sent')

        user = get_object_or_404(User, email=email)

        if not user.is_verified:
            send_email_verification(request, user)

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class ActivateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request, token: str, uid: str, format=None):
        uidb64 = force_text(urlsafe_base64_decode(uid))

        user = get_object_or_404(User, id=uidb64)
        token = email_token_generator.check_token(user, token)

        if token:
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({'Verified': 'Successfully verified user.'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'User is already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Invalid Token': 'Given token is not valid'}, status=status.HTTP_400_BAD_REQUEST)


class BlacklistToken(APIView):
    permission_classes = [AllowAny]

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
