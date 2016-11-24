from django.contrib import admin

from bi.bucketlistapi.models import BucketList, Item

# Register your models here.
admin.site.register(BucketList)
admin.site.register(Item)
