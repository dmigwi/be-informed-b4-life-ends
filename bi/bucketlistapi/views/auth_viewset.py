from django.contrib.auth.models import User
from rest_framework.decorators import (api_view,
                                       permission_classes,
                                       authentication_classes)
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from bi.bucketlistapi.serializer import UserSerializer

# Functional Views

HELP_MESSAGE = {
    'Copyright': ('This is a D.R.F. (Be Informed Before Life Ends)'
                  ' Bucketlist api built by Migwi '
                  'Ndung\'u :**https://github.com/andela-dmigwi/'
                  'be-informed-b4-life-ends.git**'),
    'Credits_To': ('Alex Mwaleh, Hassan Oyeboade,'
                   ' Percila Njira and Others'),
    'route_1': '/api/v1 (GET) Shows This MESSAGE',
    'route_2': '/api/v1/auth/register (POST) register a new user',
    'route_3': ('/api/v1/auth/login (POST) obtain token and'
                ' put it in Authorization header'),
    'route_4': ('/api/v1/bucketlists (GET) get all bucketlist;'
                ' (POST) Create new bucketlists'),
    'route_5': ('/api/v1/bucketlists/{id} (PUT) modify; '
                '(GET) Retrieve; (DELETE) delete one bucketlist'),
    'route_6': ('/api/v1/bucketlists/{id}/items (POST)'
                ' create new bucketlist item '),
    'route_7': ('/api/v1/bucketlists/{id}/items/{id}'
                ' (PUT) modify (DELETE) delete an item')
}


@api_view(['GET'])
@permission_classes(())
def homepage_display(request):
    '''
    This is a help text that also acts a confirmation
    that the application is running as expected
    '''
    return Response(HELP_MESSAGE, status=200)


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
        return Response(message, status=201)
    return Response(serialized._errors, status=400)


@api_view(['POST'])
@authentication_classes((TokenAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def logout_user(request):
    '''For a successful logout, delete the stored token'''
    if request.auth:
        request.auth.delete()
    return Response({"Message": " Logout Successful"}, status=200)
