from django.shortcuts import render, redirect
from django.core.mail import send_mail
from .forms import FormularioContacto


# Create your views here.


def contacto(request):

    if request.method == 'POST':

        formCorreo = FormularioContacto(request.POST)

        if formCorreo.is_valid():

            infoForm = formCorreo.cleaned_data
            mensaje = infoForm['mensaje']
            email = infoForm['email']
            mensaje_con_mail = {
                'mensaje_con_mail': f'MENSAJE: \n {mensaje} \n MAIL: \n {email}'
            }

            send_mail(infoForm['asunto'], mensaje_con_mail['mensaje_con_mail'], infoForm.get(
                'email', ''), ['pablocandia392@gmail.com'],)
            return redirect('inicio')

    else:
        formCorreo = FormularioContacto()

    return render(request, 'ayuda.html', {'form': formCorreo})
