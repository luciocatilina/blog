from django.shortcuts import render,redirect

# Create your views here.

#public key = TEST-2eecdb20-4afc-45f7-b5e2-82460942c25d
access_token = "TEST-8662781212986451-012413-8aa7f716816a41b733af310c618ec951-165275709"

'''
    id :1411042653,
    email : 'test_user_259213806@testuser.com',
    nickname : 'TESTUSER259213806',
    password : 'VbxGDNOiAP',
'''
import mercadopago


def donaciones(request):
    
    sdk = mercadopago.SDK(access_token)

    preference_data = {
        "items": [
            {
                'title': 'Mi producto',
                'quantity' : 1,
                'unit_price' : 75,
            }
        ],
        "back_urls": {
            "success": "http://tu-sitio.com/pago-exitoso",
            "failure": "http://tu-sitio.com/pago-fallido",
            "pending": "http://tu-sitio.com/pago-pendiente"
        },
        "auto_return": "approved"
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]

    return redirect(preference_response["response"]["sandbox_init_point"])