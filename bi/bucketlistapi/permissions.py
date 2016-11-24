from rest_framework import permissions

from bi.bucketlistapi.models import BucketList, Item


class IsOwner(permissions.BasePermission):
    '''
    allow the user to proceed if the user owns the bucketlist or
    bucketlist item they are trying to access
    '''
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, BucketList):
            return obj.created_by == request.user
        elif isinstance(obj, Item):
            return obj.bucketlist.created_by == request.user
