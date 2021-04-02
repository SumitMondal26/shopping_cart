from home_page.models import products
from .serializers import products_serializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET'])
def products_view(request):
    product=products.objects.all()
    serializer=products_serializer(product,many=True)
    return Response(serializer.data)

    
@api_view(['POST'])
def product_add(request):
   if request.method == "POST":
       saveserilaize=products_serializer(data=request.data)
       if saveserilaize.is_valid():
            saveserilaize.save()
            return Response(saveserilaize.data,status=status.HTTP_201_CREATED)
       else :
           return Response(saveserilaize.errors,status=status.HTTP_400_BAD_REQUEST)     
@api_view(['POST'])
def product_update(request,pk):
    product=products.objects.get(id=pk)
    s=products_serializer(instance=product , data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data,status=status.HTTP_201_CREATED)
    else :
        return Response(s.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response(s.data) 