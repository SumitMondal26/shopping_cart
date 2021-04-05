from django.contrib import admin
from django.urls import path
from home_page.views import home        
from api.views import *
from django.conf.urls import url
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home , name='home-page'),
    path("products-view/",products_view,name="products-view"),
    path("products-add/",product_add,name="products-add"),
    path("products-update/<str:pk>/",product_update,name="products-update"),

    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
    url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}), 
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
