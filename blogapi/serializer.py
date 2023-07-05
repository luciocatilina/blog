from AppBlog.models import Publicacion
from rest_framework import serializers

class PublicacionesRestApiSerializer (serializers.ModelSerializer):
    class Meta:
        model= Publicacion
        fields = '__all__'