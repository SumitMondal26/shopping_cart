from rest_framework import serializers
from home_page.models import products

class products_serializer(serializers.ModelSerializer):
    class Meta:
        model=products
        fields="__all__"