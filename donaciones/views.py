from django.shortcuts import render,redirect
import json
from django.urls import reverse

# Create your views here.

#public key = TEST-2eecdb20-4afc-45f7-b5e2-82460942c25d
access_token = "APP_USR-4768569376877488-070414-b015527a10a0d92cbf550e2489af3548-1411042653"

'''
    id :1411042653,
    email : 'test_user_259213806@testuser.com',
    nickname : 'TESTUSER259213806',
    password : 'VbxGDNOiAP',
'''
import mercadopago

def donaciones(request):

    return render (request, 'donaciones.html')


def mercado_pago(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        monto = int(data.get('monto'))

        sdk = mercadopago.SDK(access_token)
        params = {}
        
        preference_data = {
                "items": [
                    {
                        'title': 'donacion',
                        'quantity' : 1,
                        "currency_id": "ARS",
                        'unit_price' : monto,
                    }
                ],
                "back_urls": {
                    "success": "https://127.0.0.1:8000/donaciones/checkout/pago_exitoso",
                    "failure": "https://127.0.0.1:8000/donaciones/checkout/pago_fallido",
                    "pending": "https://127.0.0.1:8000/donaciones/checkout/pago_pendiente"
                },
                "auto_return": "approved"
            }

        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]
        params['preference'] = preference

        
        return render(request, 'pago_form.html', params)




def pago_exitoso(request):
    
    return render(request, 'ok.html')

def pago_pendiente(request):
    
    return render(request, 'pendiente.html')

def pago_fallido(request):
    
    return render(request, 'fallo.html')