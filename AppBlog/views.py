from typing import Any, Dict
from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
from .forms import *
from .models import *
from django.contrib.auth.models import User
from django.views.generic import ListView, CreateView, DeleteView
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect
from django.contrib.auth.mixins import LoginRequiredMixin

from django.http import JsonResponse

############################################
################## JSON ####################

def get_publicaciones(request):

    publicaciones = list(Publicacion.objects.values())

    
    for i in range(len(publicaciones)):
        cant_comentarios = Comentario.objects.filter(comentario_id = publicaciones[i]['id'])
        usuario = str(User.objects.get(pk = publicaciones[i]['usuario_id']))
        publicaciones[i]['usuario_id'] = usuario
        publicaciones[i]['cant_comentarios'] = len(cant_comentarios)

    if (len(publicaciones)>0):
        data={'message': 'Success', 'publicaciones': publicaciones}
    
    else:
        data={'message': 'Not Found'}

    return JsonResponse(data)

def get_comentarios(request, pub_id):
    comentarios = list(Comentario.objects.filter(comentario_id = pub_id).values())

    if (len(comentarios)>0):
        data = {'message': 'Success', 'comentarios': comentarios}
    else:
        data = {'message': 'Not Found'}

    return JsonResponse(data)

############################################
#####LISTADO PUBLICACIONES DESDE JSON#######

def todas_publicaciones(request):

    return render(request, 'publicaciones.html')

def inicio(request):

    try:
        request.session['favs']
    except:
        request.session['favs'] = {}
                                                      
    return render(request, 'index.html')


############################################
################## CREAR PUBLICACION #######
class Crear_publicacion(LoginRequiredMixin, CreateView):

    model = Publicacion
    success_url = reverse_lazy('inicio')
    fields = ['nombre', 'texto']
    template_name = 'crear_publicacion.html'

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.usuario = self.request.user
        obj.save()
        return redirect('inicio')
    

############################################
################## PUBLICACION DETALLE #####

class Crear_comentario(LoginRequiredMixin, CreateView):

    model = Comentario
    fields = ['texto']
    template_name = 'crear_comentario.html'
 
    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.usuario = self.request.user
        obj.comentario_id = self.kwargs['pk']
        var = self.kwargs['pk']
        obj.save()
        return redirect('../../publicaciones/' + str(var))
        #arreglar este redirect xd

    def get_context_data(self, **kwargs):
        context=super(Crear_comentario, self).get_context_data(**kwargs)
        context['publicacion']=Publicacion.objects.filter(pk=self.kwargs['pk'])
        context['comentarios']=Comentario.objects.select_related('comentario').filter(comentario_id = self.kwargs['pk']).order_by('-fecha_creacion')
        return context
        '''
        coment=Comentario.objects.select_related('comentario').all().order_by('-fecha_creacion')
        c2=Comentario.objects.filter(pk=self.kwargs['pk']).order_by('-fecha_creacion')
        temp=Publicacion.objects.filter(pk=self.kwargs['pk'])
        '''




class Mis_publicaciones(LoginRequiredMixin, ListView):

    model = Publicacion
    template_name = 'mis_publicaciones.html'

    
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(usuario=self.request.user).order_by('-pk')


def borrar_pub(request, pub_id):
    publicacion_a_borrar = Publicacion.objects.get(pk = pub_id)
    publicacion_a_borrar.delete()

    return redirect('mis_publicaciones')
