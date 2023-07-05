from django.urls import path
from .views import donaciones ,mercado_pago,pago_exitoso, pago_fallido, pago_pendiente

urlpatterns = [
    path('donaciones', donaciones, name='donaciones'),
    path('donaciones/checkout', mercado_pago, name='mercado_pago'),
    path('donaciones/checkout/pago_exitoso', pago_exitoso, name='pago_exitoso'),
    path('donaciones/ckeckout/pago_pendiente', pago_pendiente, name='pago_pendiente'),
    path('donaciones/checkout/pago_fallido', pago_fallido, name='pago_fallido'),
    
]