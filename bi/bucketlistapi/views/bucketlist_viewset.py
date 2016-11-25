from django.db import IntegrityError
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)

from bi.bucketlistapi.models import BucketList, Item
from bi.bucketlistapi.permissions import (IsOwner,
                                          IsBucketListValid)
from bi.bucketlistapi.serializer import (BucketListSerializer,
                                         ItemSerializer)


class PaginateTheData(PageNumberPagination):
    '''Pagination Class'''
    page_size = 10                       # Default to 10
    page_size_query_param = 'page_size'  # client overrides, by`?page_size=xxx`
    max_page_size = 100                  # Max limit allowed .


class BucketListViewSet(generics.ListCreateAPIView):
    '''handles GET and POST Routes on Bucketlists'''
    pagination_class = PaginateTheData
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        try:
            serializer.save(created_by=self.request.user)
        except IntegrityError:
            raise ValidationError("BucketList already exists")

    # Override get_queryset() to allow class pagination work
    def get_queryset(self):
        return self.queryset.filter(created_by=self.request.user)


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
    permission_classes = (IsAuthenticated, IsBucketListValid)

    def perform_create(self, serializer):
        try:
            serializer.save(bucketlist=self.request.bucketlist)
        except Exception:
            raise ValidationError("Item already exists")


class ItemViewSet(generics.RetrieveUpdateDestroyAPIView):
    '''Updates and Deletes a Bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated, IsOwner, IsBucketListValid)
    lookup_field = ('id')
