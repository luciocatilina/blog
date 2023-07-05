from django.db import models

# Create your models here.

class Donaciones(models.Model):

    monto = models.IntegerField()
    fecha_creacion = models.DateField(auto_now_add=True)