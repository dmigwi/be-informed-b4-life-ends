from django.contrib.auth.models import User
from django.db import models


class Base(models.Model):
    '''Base Class mapper with common columns and set to abstract'''
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

    def convert_date_created_to_string(self):
        return self.date_created.strftime("%a %d/%b/%Y %-H:%M:%S")

    def convert_date_modified_to_string(self):
        return self.date_created.strftime("%a %d/%b/%Y %-H:%M:%S")


class BucketList(Base):
    '''Model class used to create table with Bucketlist details'''
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User,
                                   related_name='bucketlists',
                                   on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'created_by',)

    def get_all_associated_bucketlists(self):
        # Helps avoid circular imports
        from bi.bucketlistapi.serializer import ItemSerializer

        items = Item.objects.all().filter(bucketlist=self.id)
        items = ItemSerializer(items, many=True)
        return items.data


class Item(Base):
    '''MOdel class used to create table with bucketlist items details'''
    name = models.CharField(max_length=100)
    done = models.BooleanField(default=False)
    bucketlist = models.ForeignKey(BucketList,
                                   related_name='items',
                                   on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'bucketlist',)
