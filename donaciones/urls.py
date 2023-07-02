from django.urls import path
from .views import donaciones

urlpatterns = [
    path('donaciones', donaciones, name='donaciones'),
]