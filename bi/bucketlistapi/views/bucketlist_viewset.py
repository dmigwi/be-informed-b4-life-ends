from rest_framework import generics

from bi.bucketlistapi.models import BucketList, Item
from bi.bucketlistapi.serializer import (BucketListSerializer,
                                         ItemSerializer)


class BucketListViewSet(generics.ListCreateAPIView):
    '''handles GET and POST Routes on Bucketlists'''
    query_set = BucketList.objects.all()
    serializer_class = BucketListSerializer


class SingleBucketListViewSet(generics.RetrieveUpdateDestroyAPIView):
    '''handles GET, PUT and DELETE on a Single Bucketlist'''
    query_set = BucketList.objects.all()
    serializer_class = BucketListSerializer


class CreateItemViewSet(generics.CreateAPIView):
    '''Handles POST requests on a bucketlist item'''
    query_set = Item.object.all()
    serializer_class = ItemSerializer


class ItemViewSet(generics.RetrieveDestroyAPIView):
    '''Handles PUT and DELETE requests on a Bucketlist item'''
    query_set = Item.object.all()
    serializer_class = ItemSerializer
