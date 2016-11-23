from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)

from bi.bucketlistapi.models import BucketList, Item
from bi.bucketlistapi.permissions import (IsBucketListOwner,
                                          IsItemOwner,
                                          BucketListExists,
                                          ItemExists)
from bi.bucketlistapi.serializer import (BucketListSerializer,
                                         ItemSerializer)


class BucketListViewSet(generics.ListCreateAPIView):
    '''handles GET and POST Routes on Bucketlists'''
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (BucketListExists, IsAuthenticated)

    def perform_create(self, serializer):
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
    permission_classes = (IsBucketListOwner, BucketListExists, IsAuthenticated)


class CreateItemViewSet(generics.CreateAPIView):
    '''Creates a new bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated, IsBucketListOwner, ItemExists)

    def perform_create(self, serializer):
        serializer.save(bucketlist=self.request.bucketlist)


class ItemViewSet(generics.UpdateAPIView, generics.DestroyAPIView):
    '''Updates and Deletes a Bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated, IsBucketListOwner,
                          IsItemOwner, ItemExists)
    lookup_field = ('id')
