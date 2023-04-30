from django.shortcuts import render, redirect
from .forms import *
from .models import *
from django.views.generic import ListView, DetailView, CreateView, DeleteView
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import send_mail



class Publicaciones(ListView):

    model = Publicacion
    template_name = 'todas_publicaciones.html'
    paginate_by = 8

    def get_queryset(self):
        return Publicacion.objects.all().order_by('-pk')

'''
class Detalle_publicacion(DetailView):

    model = Publicacion
    template_name = 'detalle_publicacion.html'
'''

class Inicio(ListView):

    model= Publicacion
    template_name='index.html'

    def get_queryset(self):
        return Publicacion.objects.order_by('-pk')[:3]

class Crear_publicacion(LoginRequiredMixin, CreateView):

    model = Publicacion
    success_url = reverse_lazy('inicio')
    fields = ['nombre', 'texto']
    template_name = 'crear_publicacion.html'

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.usuario = self.request.user
        obj.save()
        return HttpResponseRedirect('../')
    
###

###

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
        return redirect('../../publicacion/' + str(var))

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


class Borrar_publicacion(LoginRequiredMixin, DeleteView):

    model = Publicacion
    success_url = ('../../')
    template_name = 'publicacion_confirm_delete.html'


'''
def donaciones(request):

    return render(request, 'donaciones.html')
'''

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
