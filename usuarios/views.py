from django.shortcuts import render, redirect
from django.utils.translation import gettext_lazy
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from .forms import *

# Create your views here.


def iniciar_sesion(request):

    if request.method == 'POST':

        form_login = MyAuthForm(request, data=request.POST)

        if form_login.is_valid():

            usuario = form_login.cleaned_data.get('username')
            contra = form_login.cleaned_data.get('password')

            user = authenticate(username=usuario, password=contra)

            if user:
                login(request, user)
                return redirect('inicio')
            else:
                return render(request, 'index.html')
    else:
        form_login = MyAuthForm()

    return render(request, 'login.html', {'form_login': form_login})


def registration(request):

    if request.method == 'POST':
        form_registration = Formulario_registro(request.POST)

        if form_registration.is_valid():
            nombre_usuario = form_registration.cleaned_data['username']
            contrasena_usuario = form_registration.cleaned_data['password1']
            form_registration.save()
            user = authenticate(username=nombre_usuario,
                                password=contrasena_usuario)
            if user:
                login(request, user)
                return redirect('inicio')
            else:
                return render(request, 'index.html')

    else:
        form_registration = Formulario_registro()

    return render(request, 'registration.html', {'form_registration': form_registration})


class MyAuthForm(AuthenticationForm):
    error_messages = {
        'invalid_login': gettext_lazy(
            'Usuario y/o contraseña incorrectos'
        )
    }