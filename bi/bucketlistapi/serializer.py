from rest_framework import serializers

from bi.bucketlistapi.models import BucketList, Item


class BucketListSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    items = serializers.ReadOnlyField(
        source='get_all_associated_bucketlists')

    # Sample: 'date_created': 'Mon 21/Nov/2016 18:47:46',
    date_created = serializers.ReadOnlyField(
        source='convert_date_created_to_string')

    # Sample:  'date_modified': 'Mon 21/Nov/2016 18:47:46'
    date_modified = serializers.ReadOnlyField(
        source='convert_date_modified_to_string')

    class Meta:
        model = BucketList
        fields = ('id', 'name', 'date_created', 'date_modified',
                  'items', 'created_by')


class ItemSerializer(serializers.ModelSerializer):
    # Sample: 'date_created': 'Mon 21/Nov/2016 18:47:46',
    date_created = serializers.ReadOnlyField(
        source='convert_date_created_to_string')

    # Sample:  'date_modified': 'Mon 21/Nov/2016 18:47:46'
    date_modified = serializers.ReadOnlyField(
        source='convert_date_modified_to_string')

    class Meta:
        model = Item
        fields = ('id', 'name', 'date_created', 'date_modified', 'done')
