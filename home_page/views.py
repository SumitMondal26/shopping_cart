from django.shortcuts import render
from .models import products

def home(request):
    return render(request,"home_page/base.html",context={"data":products.objects.all()})