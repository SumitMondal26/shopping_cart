from django.db import models

class products(models.Model):
   
   product_id=models.CharField(max_length=20)
   product_name=models.CharField(max_length=50)
   product_price=models.IntegerField()
   product_image=models.ImageField(upload_to='product_images',blank=True)
   product_description=models.TextField()
   product_tag=models.CharField(max_length=10) 
   def __str__(self):
       return "id :{0} name: {1}".format(self.product_id,self.product_name)
