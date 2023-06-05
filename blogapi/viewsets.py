from rest_framework import viewsets
from AppBlog.models import Publicacion
from .serializer import PublicacionesRestApiSerializer

class PublicacionesRestApiViewSet (viewsets.ModelViewSet):

    queryset=Publicacion.objects.all()
    serializer_class = PublicacionesRestApiSerializer