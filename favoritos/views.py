from django.shortcuts import render, redirect
from django.http import HttpResponse
import json
from .models import Favoritos
from AppBlog.models import Publicacion
from django.http import JsonResponse

# Create your views here.



def favoritos(request):
    try:
        request.session['favs']
    except:
        request.session['favs'] = []
        

    if request.method == 'POST' and request.user.is_authenticated:
        usuario = request.user
        set_favoritos_sesion = set(request.session['favs'])

        #listado de IDS de publicaciones en la tabla favoritos
        ids_publicaciones_fav = Favoritos.objects.values_list('publicacion', flat=True)

        data = json.loads(request.body.decode('utf-8'))


        try:
            #BORRADO
            id_a_borrar = data.get('borrarId')
            fav_a_borrar = Favoritos.objects.get(publicacion_id = id_a_borrar)
            fav_a_borrar.delete()
            for j in set_favoritos_sesion:
                if j == id_a_borrar:
                    set_favoritos_sesion.remove(j)
                    break

        except:
            pass

        try:
            set_fav = set(data.get('listaEnviar'))
            if len(set_fav) > 0:
                
                a = set_favoritos_sesion.union(set_fav)
                #set_favoritos_sesion.union(set_fav)

                for i in set_fav:

                    
                    #verifico que el elemento de local storage no este ya almacenado
                    if i not in ids_publicaciones_fav:
                        pub_i = Publicacion.objects.get(pk=i)
                        fav_pub = Favoritos(user = usuario, publicacion = pub_i)
                        fav_pub.save()

                request.session['favs'] = list(a)

        except json.JSONDecodeError:
            pass

    else:
        if not request.user.is_authenticated:
            #no es necesario creo
            request.session['favs'] = {}

    return HttpResponse()


'''def listado_favoritos(request):


    if request.user.is_authenticated:
        usuario = request.user
        id_usuario = usuario.id
    fav_db = Favoritos.objects.filter(user_id = id_usuario)
    context = {
        'favs': request.session['favs'],
        'favs_db' : fav_db
    }

    return render(request, 'favoritos.html', context)'''


def listado_favoritos_json(request):

    if request.user.is_authenticated:

        id_usuario = request.user.id
        queryset = Favoritos.objects.filter(user_id = id_usuario)
        queryset_list = list(queryset.values())

        if (len(queryset_list) > 0):
            data = {
                'message': 'Success',
                'favoritos': queryset_list
            }
        
        else: 
            data = {
                'message': 'Not Found'
            }

        return JsonResponse(data)


def listar_favoritos(request):

    return render(request, 'favoritos.html')