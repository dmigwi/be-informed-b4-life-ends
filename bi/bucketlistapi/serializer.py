from rest_framework import serializers

from bi.bucketlistapi.models import BucketList, Item


class BucketListSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created.username')

    class Meta:
        model = BucketList
        field = ('id', 'name', 'date_created', 'date_modified', 'created_by')


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        field = ('id', 'name', 'date_created', 'date_modified', 'done')
