from django.db import models
from django.contrib.auth.models import User
from AppBlog.models import Publicacion

# Create your models here.

class Favoritos(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    