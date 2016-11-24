from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from rest_framework.serializers import ValidationError
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)

from bi.bucketlistapi.models import BucketList, Item
from bi.bucketlistapi.permissions import IsOwner
from bi.bucketlistapi.serializer import (BucketListSerializer,
                                         ItemSerializer)


class BucketListViewSet(generics.ListCreateAPIView):
    '''handles GET and POST Routes on Bucketlists'''
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        try:
            serializer.save(created_by=self.request.user)
        except IntegrityError:
            raise ValidationError("BucketList already exists")

    def list(self, request):
        queryset = self.get_queryset().filter(created_by=self.request.user)
        serializer = BucketListSerializer(queryset, many=True)
        return Response(serializer.data)


class SingleBucketListViewSet(generics.RetrieveUpdateDestroyAPIView):
    '''handles GET, PUT and DELETE on a Single Bucketlist'''
    queryset = BucketList.objects.all()

    serializer_class = BucketListSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated, IsOwner)


class CreateItemViewSet(generics.CreateAPIView):
    '''Creates a new bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        bucketlist = BucketList.objects.get(id=self.kwargs['pk'])
        try:
            serializer.save(bucketlist=bucketlist)
        except IntegrityError:
            raise ValidationError("Item already exists")


class ItemViewSet(generics.RetrieveUpdateDestroyAPIView):
    '''Updates and Deletes a Bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated, IsOwner)
    lookup_field = ('id')
