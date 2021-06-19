from datetime import datetime

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from contact.serializers import MessageSerializer


class CreateMessage(APIView):

    def post(self, request: Request, format=None):
        serializer = MessageSerializer(data=request.data)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if self.request.session.has_key('message_sent'):
            delta = round((self.request.session['message_sent'] +
                           60) - datetime.now().timestamp())

            if delta > 0:
                return Response({'Too Many Requests': f'Please wait {delta} more seconds before sending another message.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            else:
                self.request.session.pop('message_sent')

        if serializer.is_valid():
            # TODO
            pass

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
