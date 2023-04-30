from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('', Inicio.as_view(), name='inicio'),
    #path('publicacion/<int:pk>/a', Detalle_publicacion.as_view(), name='detalle_publicacion'),
    path('publicaciones', Publicaciones.as_view(), name='publicaciones'),
    path('crear_publicacion', Crear_publicacion.as_view(), name='crear_publicacion'),
    path('publicacion/borrar/<int:pk>', Borrar_publicacion.as_view(), name='borrar_publicacion'),
    path('publicacion/<int:pk>/', Crear_comentario.as_view(), name='crear_comentario'),
    path('mis_publicaciones/', Mis_publicaciones.as_view(), name='mis_publicaciones'),
    path('ayuda', contacto, name='ayuda'),
    path('borrar_pub/<int:pub_id>', borrar_pub, name='borrar_pub'),
#    path('donaciones', donaciones, name='donaciones'),

]