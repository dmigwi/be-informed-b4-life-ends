"""bi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Be Informed Before Life Ends')


admin.autodiscover()

urlpatterns = [
    url(r'^$', schema_view),
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include('bi.bucketlistapi.urls')),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]
