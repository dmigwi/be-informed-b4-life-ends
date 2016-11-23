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
        if user.is_anonymous():
            raise ValidationError(
                {"detail": "No Password or Token was detected"})
        pk = int(view.kwargs.get('pk'))
        try:
            queryset = BucketList.objects.get(id=pk, created_by=user)
            # pass bucketlist through the request
            request.bucketlist = queryset
            return True
        except Exception:
            raise ValidationError({"detail": "BucketList Id not Found"})


class IsItemOwner(permissions.BasePermission):
    '''
    Returns an error if the user is trying to view a bucketlist items
    whereby they are not authorised to view the contents of the bucketlist.
    Or the bucketlist does not exist
    '''

    def has_permission(self, request, view):
        item_id = int(view.kwargs.get('id'))
        bucketlist_id = int(view.kwargs.get('pk'))
        queryset = Item.objects.filter(id=item_id, bucketlist=bucketlist_id)
        if not queryset:
            raise ValidationError({"detail": "Item Id not Found"})
        return True


class BucketListExists(permissions.BasePermission):
    '''Returns an error if the provided bucketlist name exists'''

    def has_permission(self, request, view):
        user = request.user
        name = request.data.get('name')
        bucketlist_id = int(view.kwargs.get('pk'))
        queryset = BucketList.objects.filter(name=name, created_by=user)
        if queryset.exclude(id=bucketlist_id):  # exclude current bucketlist
            raise ValidationError({"detail": "BucketList already exists"})
        return True


class ItemExists(permissions.BasePermission):
    '''Returns an error if the provided Item name exists'''

    def has_permission(self, request, view):
        bucketlist_id = int(view.kwargs.get('pk'))
        item_id = int(view.kwargs.get('id'))
        name = request.data.get('name')
        queryset = Item.objects.filter(name=name, bucketlist=bucketlist_id)
        if queryset.exclude(id=item_id):  # exclude current item
            raise ValidationError({"detail": "Item already exists"})
        return True
