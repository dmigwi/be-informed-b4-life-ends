from django.contrib import admin

from bi.bucketlistapi.models import BucketList, Item

admin.site.register(BucketList)
admin.site.register(Item)
