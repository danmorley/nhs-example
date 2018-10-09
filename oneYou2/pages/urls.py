from django.conf.urls import url

from . import views

app_name = 'oneyou_pages'
urlpatterns = [
    url(r'^(\d+)/unpublish/', views.unpublish, name='unpublish-custom'),
    url(r'^(\d+)/copy/', views.copy, name='copy-page'),
    url(r'^(\d+)/edit/', views.edit, name='unpublish-page'),
]
