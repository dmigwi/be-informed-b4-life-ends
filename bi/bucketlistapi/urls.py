from django.conf.urls import patterns, url
from bi.bucketlistapi.veiws.bucketlist_viewset import (
    BucketListViewSet, SingleBucketListViewSet,
    CreateItemViewSet, ItemViewSet)


urlpatterns = patterns(
    # 'talk.views',
    # url(r'^$', 'home'),

    # api
    url(r'^api/v1/bucketlists/$', BucketListViewSet.as_view()),
    url(r'^api/v1/bucketlists/(?P<pk>[0-9]+)/$',
        SingleBucketListViewSet.as_view()),
    url(r'^api/v1/bucketlists/(?P<pk>[0-9]+)/items/$',
        CreateItemViewSet.as_view()),
    url(r'^api/v1/bucketlists/(?P<pk>[0-9]+)/items/(?P<pk>[0-9]+)/$',
        ItemViewSet.as_view()),
)
