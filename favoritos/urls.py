from django.urls import path
from .views import favoritos, listado_favoritos_json, listar_favoritos #,listado_favoritos,



urlpatterns = [
    path('agregar/favoritos/', favoritos),
    #path('listado/favoritos', listado_favoritos),
    path('listado/favoritos/json', listado_favoritos_json),
    path('favoritos', listar_favoritos, name='favoritos'),
]