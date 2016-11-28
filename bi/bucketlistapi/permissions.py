from rest_framework import permissions
from rest_framework.serializers import ValidationError

from bi.bucketlistapi.models import BucketList, Item


class IsOwner(permissions.BasePermission):
    '''
    allows the user to proceed if the user owns the bucketlist or
    bucketlist item they are trying to access
    '''

    def has_object_permission(self, request, view, obj):
        if isinstance(obj, BucketList):
            return obj.created_by == request.user
        elif isinstance(obj, Item):
            return obj.bucketlist.created_by == request.user


class IsBucketListValid(permissions.BasePermission):
    '''
    Used to check if bucketlist whose items, the user wants
    to edit or create is valid (i.e. exists and belongs to them)
    '''

    def has_permission(self, request, view):
        try:
            # If no error is raised by this query then the
            # bucketList is valid
            pk_bucketlist = view.kwargs.get('pk', None)
            pk_item = view.kwargs.get('id', None)
            if pk_bucketlist and pk_item:
                Item.objects.get(id=pk_item, bucketlist=pk_bucketlist)

            # get the valid bucketlist and assign it to the request
            queryset = BucketList.objects.get(id=pk_bucketlist,
                                              created_by=request.user)
            request.bucketlist = queryset
            return True
        except Exception:
            raise ValidationError({'detail': 'BucketList Not found.'})
