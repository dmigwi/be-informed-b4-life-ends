from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import (api_view,
                                       permission_classes,
                                       authentication_classes)
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from bi.bucketlistapi.serializer import UserSerializer


@api_view(['POST'])
@permission_classes(())
def register_user(request):
    '''Function saves a hashed password'''
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        username = serialized.data.get('username')
        password = serialized.data.get('password')
        User.objects.create_user(username=username, password=password)
        message = {"Message": "Registration Successful"}
        return Response(message, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes((TokenAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def logout_user(request):
    '''For a successful logout, delete the stored token'''
    if request.auth:
        request.auth.delete()
    return Response({"Message": " Logout Successful"}, status=200)
