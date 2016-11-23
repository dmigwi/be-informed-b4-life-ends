from rest_framework import generics
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)

from bi.bucketlistapi.models import BucketList, Item
from bi.bucketlistapi.permissions import (IsBucketListOwner,
                                          IsItemOwner)
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
            raise ValidationError({"detail": "BucketList name already exists"})
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
    permission_classes = (IsAuthenticated, IsBucketListOwner)

    def get(self, request, pk, format=None):
        queryset = self.get_queryset().filter(created_by=self.request.user,
                                              id=int(pk))
        if not queryset:
            raise ValidationError({"detail": "BucketList Id not Found"})
        serializer = BucketListSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        '''Updates only Bucketlist assigned to the current user'''
        name = request.data.get('name')
        pk = int(kwargs['pk'])
        queryset = self.get_queryset().filter(created_by=request.user, id=pk)
        if not queryset:
            raise ValidationError({"detail": "BucketList Id not Found"})

        if self.get_queryset().filter(created_by=request.user, name=name):
            raise ValidationError({"detail": "BucketList name already exits"})
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        '''Deletes only Bucketlist assigned to the current user'''
        queryset = self.get_queryset().filter(created_by=self.request.user,
                                              id=int(kwargs['pk']))
        if not queryset:
            raise ValidationError({"detail": "BucketList Id not Found"})
        return self.destroy(self, request, *args, **kwargs)


class CreateItemViewSet(generics.CreateAPIView):
    '''Creates a new bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        pk = serializer.context['view'].kwargs['pk']
        if self.get_queryset().filter(name=serializer.validated_data['name'],
                                      bucketlist=int(pk)):
            raise ValidationError({"detail": "Item already exits"})
        try:
            queryset = BucketList.objects.get(id=int(pk),
                                              created_by=self.request.user)
        except Exception:
            raise ValidationError({"detail": "BucketList Id not Found"})
        serializer.save(bucketlist=queryset)


class ItemViewSet(generics.UpdateAPIView, generics.DestroyAPIView):
    '''Updates and Deletes a Bucketlist item'''
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        pk = int(kwargs['pk1'])
        name = request.data['name']
        if not BucketList.objects.filter(id=pk):
            raise ValidationError({"detail": "BucketList Id not Found"})

        if self.get_queryset().filter(name=name, bucketlist=pk):
            raise ValidationError({"detail": "Item name already exits"})

        if not self.get_queryset().filter(id=int(kwargs['pk'])):
            raise ValidationError({"detail": "Item not found"})
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not BucketList.objects.filter(id=int(kwargs['pk1'])):
            raise ValidationError({"detail": "BucketList Id not Found"})
        return self.destroy(self, request, *args, **kwargs)
