from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from bi.bucketlistapi.serializer import UserSerializer


@api_view(['POST'])
@permission_classes(())
def register_user(request):
    '''Function saves a hashed password'''
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        username = serialized.data.get('username', None)
        password = serialized.data.get('password', None)
        User.objects.create_user(username=username, password=password)
        message = {"Message": "Registration Successfull"}
        return Response(message, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
