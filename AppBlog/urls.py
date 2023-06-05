from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('', inicio, name='inicio'),
    path('publicaciones_json', get_publicaciones, name='publicaciones_json'),
    path('comentarios_json/<int:pub_id>', get_comentarios, name='comentarios_json'),
    path('publicaciones', todas_publicaciones, name='publicaciones'), 
    path('crear_publicacion', Crear_publicacion.as_view(), name='crear_publicacion'),
    path('publicaciones/<int:pk>/', Crear_comentario.as_view(), name='crear_comentario'),
    path('mis_publicaciones/', Mis_publicaciones.as_view(), name='mis_publicaciones'),
    path('borrar_pub/<int:pub_id>', borrar_pub, name='borrar_pub'),
]