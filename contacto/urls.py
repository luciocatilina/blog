from django.urls import path
from .views import contacto

urlpatterns = [
    path('ayuda', contacto, name='ayuda'),
]