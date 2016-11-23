from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token
from bi.bucketlistapi.views.bucketlist_viewset import (
    BucketListViewSet, SingleBucketListViewSet,
    CreateItemViewSet, ItemViewSet)
from bi.bucketlistapi.views.auth_viewset import (register_user,
                                                 logout_user)


urlpatterns = [
    # 'talk.views',
    # url(r'^$', 'home'),

    # api
    url(r'^auth/login', obtain_auth_token,
        name='user_login'),

    url(r'^auth/logout', logout_user,
        name='user_logout'),

    url(r'^auth/register', register_user,
        name='user_register'),

    url(r'^bucketlists$', BucketListViewSet.as_view(),
        name='multiple_bucketlists_view'),

    url(r'^bucketlists/(?P<pk>[0-9]+)$',
        SingleBucketListViewSet.as_view(), name='single_bucketlist_view'),

    url(r'^bucketlists/(?P<pk>[0-9]+)/items$',
        CreateItemViewSet.as_view(), name='create_item_view'),

    url(r'^bucketlists/(?P<pk>[0-9]+)/items/(?P<pk1>[0-9]+)$',
        ItemViewSet.as_view(), name='edit_item_view'),
]
