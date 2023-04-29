from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Publicacion(models.Model):

    nombre=models.CharField(max_length=60, null=False, blank=False)
    texto=models.TextField(max_length=700)
    usuario=models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_creacion=models.DateTimeField(auto_now_add=True)
    #fecha_modificacion=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.nombre} - {self.usuario}'

class Comentario(models.Model):
    comentario=models.ForeignKey(Publicacion, related_name='comentarios',
                                on_delete=models.CASCADE)
    usuario=models.ForeignKey(User, on_delete=models.CASCADE)
    texto=models.TextField(max_length=500)    
    fecha_creacion=models.DateTimeField(auto_now_add=True)
    #fecha_modificacion=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Publicación:{self.comentario.nombre} - Respondido por {self.usuario}'