
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from jwt import decode as jwt_decode
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect

from users.models import User
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
                    token = RefreshToken.for_user(user).access_token
                    domain = get_current_site(request).domain
                    link = f'http://{domain}/api/user/activate/{token}/'

                    send_mail(subject='Personal Blog - Activate your account',
                              message=f"Hello {user.username}, please activate your account by clicking on the link below. \n{link}\n\n\nIf it's not you, please ignore this e-mail.",
                              from_email=None,
                              recipient_list=[user.email],
                              fail_silently=False)

                    return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Forbidden': 'Cannot register user when already logged in.'}, status.HTTP_403_FORBIDDEN)


class ActivateUser(APIView):
    def get(self, request: Request, token: str, format=None):
        try:
            token_model = jwt_decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=token_model['user_id'])

            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({'Verified': 'Successfully verified user.'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'User is already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        except ExpiredSignatureError:
            return Response({'Token Expired': 'Token already expired'}, status=status.HTTP_400_BAD_REQUEST)
        except InvalidTokenError:
            return Response({'Invalid Token': 'Token is not valid'}, status=status.HTTP_400_BAD_REQUEST)


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
