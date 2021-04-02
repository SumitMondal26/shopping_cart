from django.contrib import admin
from django.urls import path
from home_page.views import home        
from api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home , name='home-page'),
    path("products-view/",products_view,name="products-view"),
    path("products-add/",product_add,name="products-add"),
    path("products-update/<str:pk>/",product_update,name="products-update"),

]
