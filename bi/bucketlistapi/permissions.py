from rest_framework import permissions
from rest_framework.serializers import ValidationError

from bi.bucketlistapi.models import BucketList, Item


class IsBucketListOwner(permissions.BasePermission):
    '''
    Returns an error if the current user does not have the
    permission to view the details of the bucketlist they requested
    '''

    def has_permission(self, request, view):
        user = request.user
        pk = int(view.kwargs.get('pk'))
        queryset = BucketList.objects.filter(id=pk, created_by=user)
        if not queryset.exists:
            raise ValidationError({"detail": "BucketList Id not Found"})
        return True


class IsItemOwner(permissions.BasePermission):
    '''
    Returns an error if the user is trying to view a bucketlist items
    whereby they are not authorised to view the contents of the bucketlist.
    Or the bucketlist does not exist
    '''

    def has_permission(self, request, view):
        item_id = int(view.kwargs.get('pk1'))
        bucketlist_id = int(view.kwargs.get('pk1'))
        queryset = Item.objects.filter(id=item_id, bucketlist=bucketlist_id)
        if not queryset.exists:
            raise ValidationError({"detail": "Item Id not Found"})
        return True
