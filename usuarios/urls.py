from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('iniciar_sesion', iniciar_sesion, name='login'),
    path('registro', registration, name='registration'),
    path('cerrar_sesion', LogoutView.as_view(template_name='AppBlog/logout.html'), name='logout'),
]