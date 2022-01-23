from datetime import datetime

from django.shortcuts import get_object_or_404
from django.utils.encoding import force_str
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
from users.serializers import (AvatarSerializer, CreateUserSerializer,
                               UserPasswordSerializer,
                               UserPersonalDetailsSerializer, UserSerializer)
from users.utils import (delete_acc_token_generator, email_token_generator,
                         password_reset_token_generator,
                         send_email_delete_user, send_email_password_reset,
                         send_email_verification)


class GetCurrentUser(APIView):
    """
    Current User

    Return an information about the current logged in user.
    """

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={200: UserSerializer()})
    def get(self, request: Request, format=None):
        user = request.user

        return Response({'username': user.username,
                         'email': user.email,
                         'first_name': user.first_name,
                         'last_name': user.last_name,
                         'title': user.title,
                         'avatar': user.avatar.url,
                         'is_staff': user.is_staff,
                         'is_verified': user.is_verified})


class UploadUserAvatar(APIView):
    """
    Upload Avatar

    Upload an Avatar for current User
    """

    permission_classes = [IsAuthenticated]

    def post(self, request: Request, format=None):
        serializer = AvatarSerializer(data=request.data)

        if serializer.is_valid():

            user = request.user
            user.avatar = request.data.get('avatar')
            user.save()

            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetUserPassword(APIView):
    """
    ResetUserPassword

    .
    """
    permission_classes = [AllowAny]

    def post(self, request: Request, token: str, uid: str, format=None):
        serializer = UserPasswordSerializer(data=request.data)
        uidb64 = force_str(urlsafe_base64_decode(uid))
        user = get_object_or_404(User, id=uidb64)
        token = password_reset_token_generator.check_token(user, token)

        if token:
            if serializer.is_valid():
                if user.check_password(serializer.data.get('password')):
                    new_password = serializer.data.get('new_password')
                    user.set_password(new_password)
                    user.save()

                    return Response(status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class SendEmailPasswordReset(APIView):
    """
    Send E-Mail

    .
    """
    permission_classes = [AllowAny]

    def post(self, request: Request, email: str, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Stop user from spamming email verification
        if self.request.session.has_key('password_reset_email_sent'):
            delta = round((self.request.session['password_reset_email_sent'] +
                           600) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before doing another request.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('password_reset_email_sent')

        user = get_object_or_404(User, email=email)

        send_email_password_reset(request, user)
        self.request.session['password_reset_email_sent'] = datetime.now(
        ).timestamp()

        return Response(status=status.HTTP_200_OK)


class SendEmailVerification(APIView):
    """
    Send Email Verification

    Send an verification E-Mail to given User's ``email``.
    """
    permission_classes = [AllowAny]

    @swagger_auto_schema(responses={200: openapi.Response(description='Ok'), 400: openapi.Response(description="Bad Request"), 404: openapi.Response(description='Not Found'), 429: openapi.Response(description="Too many Requests")})
    def post(self, request: Request, email: str, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Stop user from spamming email verification
        if self.request.session.has_key('verification_email_sent'):
            delta = round((self.request.session['verification_email_sent'] +
                           600) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before doing another request.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('verification_email_sent')

        user = get_object_or_404(User, email=email)

        if not user.is_verified:
            send_email_verification(request, user)
            self.request.session['verification_email_sent'] = datetime.now(
            ).timestamp()

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class SendEmailDeleteUser(APIView):
    """
    Send Email to delete User account

    .
    """
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Stop user from spamming email to delete user account
        if self.request.session.has_key('delete_user_email_sent'):
            delta = round((self.request.session['delete_user_email_sent'] +
                           600) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before doing another request.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('delete_user_email_sent')

        user = request.user
        if user.is_active:
            send_email_delete_user(request, user)
            self.request.session['delete_user_email_sent'] = datetime.now(
            ).timestamp()

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangeUserPassword(APIView):
    """
    Change user password

    .
    """
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, format=None):
        serializer = UserPasswordSerializer(data=request.data)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Stop user from spamming email verification
        if self.request.session.has_key('password_change'):
            delta = round((self.request.session['password_change'] +
                           120) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before doing another request.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('password_change')

        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('password')):
                password = serializer.data.get('new_password')
                user.set_password(password)
                user.save()
                self.request.session['password_change'] = datetime.now(
                ).timestamp()

                return Response(status=status.HTTP_201_CREATED)

            return Response({'detail': 'Password is not correct'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangeUserDetails(APIView):
    """
    Change User personal details

    .
    """
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, format=None):
        serializer = UserPersonalDetailsSerializer(data=request.data)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Stop user from changing personal details too often
        if self.request.session.has_key('details_change'):
            delta = round((self.request.session['details_change'] +
                           60) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before doing another request.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('details_change')

        if serializer.is_valid():
            is_changed = False
            user = request.user
            if serializer.data.get('username'):
                user.username = serializer.data.get('username')
                is_changed = True
            if serializer.data.get('email'):
                user.email = serializer.data.get('email')
                is_changed = True
            if serializer.data.get('first_name'):
                user.first_name = serializer.data.get('first_name')
                is_changed = True
            if serializer.data.get('last_name'):
                user.last_name = serializer.data.get('last_name')
                is_changed = True

            if is_changed:
                user.save()
                self.request.session['details_change'] = datetime.now(
                ).timestamp()

                return Response(status=status.HTTP_201_CREATED)

            return Response({'detail': 'You need to change at least 1 of the values.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivateUser(APIView):
    """
    Activate User

    Activate a User with given ``UID`` and ``Token``.
    """
    permission_classes = [AllowAny]

    @swagger_auto_schema(responses={200: openapi.Response(description='Ok'), 400: openapi.Response(description="Bad Request"), 404: openapi.Response(description='Not Found'), 406: openapi.Response(description="Invalid Token")})
    def post(self, request: Request, token: str, uid: str, format=None):
        uidb64 = force_str(urlsafe_base64_decode(uid))

        user = get_object_or_404(User, id=uidb64)
        token = email_token_generator.check_token(user, token)

        if token:
            if not user.is_verified:
                user.is_verified = True
                user.save()

                return Response({'Verified': 'Successfully verified user.'}, status=status.HTTP_201_CREATED)

            return Response({'Bad Request': 'User is already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Invalid Token': 'Given token is not valid'}, status=status.HTTP_406_NOT_ACCEPTABLE)


class DeleteUser(APIView):
    """
    Delete User account

    Delete a User with given ``UID`` and ``Token``.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, token: str, uid: str, format=None):
        uidb64 = force_str(urlsafe_base64_decode(uid))

        user = get_object_or_404(User, id=uidb64)
        token = delete_acc_token_generator.check_token(user, token)

        if token:
            user.delete()

            return Response({'Deleted': 'Successfully deleted user.'}, status=status.HTTP_201_CREATED)

        return Response({'Invalid Token': 'Given token is not valid'}, status=status.HTTP_406_NOT_ACCEPTABLE)


class CreateUser(APIView):
    """
    Create User

    Create user then send him an e-mail with link to verification.
    """
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=CreateUserSerializer(), responses={200: UserSerializer(), 400: openapi.Response(description='Serializer error', examples={'application/json': CreateUserSerializer().error_messages}), 403: openapi.Response(description='Forbidden')})
    def post(self, request: Request, format=None):

        if not request.user.is_authenticated:
            serializer = CreateUserSerializer(data=request.data)

            if serializer.is_valid():
                user = serializer.save()
                if user:
                    send_email_verification(request, user)

                    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Forbidden': 'Cannot register user when already logged in.'}, status.HTTP_403_FORBIDDEN)


class BlacklistToken(APIView):
    """
    Logout User

    Logout current User and blacklist his JWT ``token``.
    """
    permission_classes = [AllowAny]

    @swagger_auto_schema(responses={200: openapi.Response(description='Ok'), 400: openapi.Response(description="Bad Request"), 403: openapi.Response(description="Forbidden")})
    def post(self, request: Request, format=None):

        if request.user.is_authenticated:
            try:
                refresh_token = request.data["refresh_token"]
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_403_FORBIDDEN)
