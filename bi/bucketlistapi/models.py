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


class BucketList(Base):
    '''Model class used to create table with Bucketlist details'''
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User,
                                   related_name='bucketlists',
                                   on_delete=models.CASCADE)


class Item(Base):
    '''MOdel class used to create table with bucketlist items details'''
    name = models.CharField(max_length=100)
    done = models.BooleanField(default=False)
    bucketlist = models.ForeignKey(BucketList,
                                   related_name='items',
                                   on_delete=models.CASCADE)
