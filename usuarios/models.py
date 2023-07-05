from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Perfil(models.Model):
    usuario=models.ForeignKey(User, on_delete=models.CASCADE)
    img_perfil = models.ImageField(upload_to='avatares', blank=True, null=True, default='avatares/blank-profile-picture-973460_960_720.webp/')

    def __str__(self) -> str:
        return f'{self.usuario} foto'