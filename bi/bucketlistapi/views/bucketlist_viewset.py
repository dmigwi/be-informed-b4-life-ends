from rest_framework import generics
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)

from bi.bucketlistapi.models import BucketList, Item
from bi.bucketlistapi.serializer import (BucketListSerializer,
                                         ItemSerializer)


class BucketListViewSet(generics.ListCreateAPIView):
    '''handles GET and POST Routes on Bucketlists'''
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        if BucketList.objects.filter(created_by=self.request.user,
                                     name=self.request.data['name']):
            raise ValidationError({"detail": "BucketList already exists"})
        serializer.save(created_by=self.request.user)

    def list(self, request):
        queryset = self.get_queryset().filter(created_by=self.request.user)
        serializer = BucketListSerializer(queryset, many=True)
        return Response(serializer.data)


class SingleBucketListViewSet(generics.RetrieveUpdateDestroyAPIView):
    '''handles GET, PUT and DELETE on a Single Bucketlist'''
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class CreateItemViewSet(generics.CreateAPIView):
    '''Handles POST requests on a bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        pk = serializer.context['view'].kwargs['pk']
        if Item.objects.filter(name=serializer.validated_data['name'],
                               bucketlist=int(pk)):
            raise ValidationError({"detail": "Item already exits"})
        try:
            queryset = BucketList.objects.get(id=int(pk))
        except Exception:
            raise ValidationError({"detail": "BucketList Id not Found"})
        serializer.save(bucketlist=queryset)


class ItemViewSet(generics.UpdateAPIView, generics.DestroyAPIView):
    '''Handles PUT and DELETE requests on a Bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        if not BucketList.objects.filter(id=int(kwargs['pk1'])):
            raise ValidationError({"detail": "BucketList Id not Found"})
        if Item.objects.filter(name=request.data.get('name')).exists:
            raise ValidationError({"detail": "Item already exits"})
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not BucketList.objects.filter(id=int(kwargs['pk1'])):
            raise ValidationError({"detail": "BucketList Id not Found"})
        return self.destroy(self, request, *args, **kwargs)
