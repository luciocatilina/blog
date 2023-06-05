//HREF DETALLE PUBLICACION
const agregarEventoPublicacion = (id) => {
    location.href = url + `/${id}`
}


//F(X) RENDER PUBLICACIONES
const renderPublicaciones = (lista, fragmento, publicacion_container) => {
    lista.forEach(p => {
        fecha_creacion = p.fecha_creacion.split('T')
        publicacion = document.createElement('section')
        publicacion.classList.add('publicacion')
        publicacion.classList.add('grid_publicacion')
        publicacion.setAttribute('id', `pub_e_list${p.id}`)
        publicacion.innerHTML = `
            <h4 class='titulo_pub'>${p.nombre}</h4>
            <h5 class='user_pub'>${p.usuario_id}</h5>
            <h5 class='coment_pub'>Comentarios: ${p.cant_comentarios}</h5>
            <div class="div_btn_fav">
                <i class="fa-regular fa-star fa-2x" id='btn_fav_${p.id}'></i>
            </div>
            <div class='div_fecha'>
                <h5>${fecha_creacion[0]}</h5>
            </div>
            
        `
        //funcion detalle publicacion
        publicacion.addEventListener('click', function () { agregarEventoPublicacion(p.id) })
        fragmento.appendChild(publicacion)
    });
    publicacion_container.appendChild(fragmento)

    lista.forEach(p => {
        if (lista_data_fav_id.includes(p.id)) {
            btn_fav = document.getElementById(`btn_fav_${p.id}`)
            btn_fav.classList.add('fa-solid')
            btn_fav.classList.remove('fa-regular')
        }
        //funcion favoritos
        favoritos(p.id)
    })
    //<i class="fa-regular fa-star fa-2x" id="fav"></i>
}

let cantidadDePaginas

const url = window.location.href

let data  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// FETCH PUBLICACIONES_JSON
const listarPublicaciones = async () => {
    try {
        const response = await fetch('./publicaciones_json');
        data = await response.json()
        data.publicaciones = data.publicaciones.reverse()
        if (data.message === 'Success') {
            calcCantidadPaginas(10)
            mostrarElementosDePagina(1, data.publicaciones, 10)
        } else {
            console.log('publicaciones no encontradas')
        }

    } catch (error) {
        console.log(error);
    }
}




//BUSCADOR
const buscador = () => {
    document.addEventListener('keyup', (e) => {
        if (e.target.matches('#buscador_input')) {
            if (e.target.value.length >= 1) {
                //e.target.value
                fragmento = document.createDocumentFragment();
                publicacion_container.innerHTML = ''
                listaIds = []
                data.publicaciones.forEach((p) => {
                    if (p.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        p.usuario_id.toLowerCase().includes(e.target.value.toLowerCase())) {

                        publicacion_container.innerHTML = ''
                        fecha_creacion = p.fecha_creacion.split('T')
                        publicacion = document.createElement('section')
                        publicacion.classList.add('publicacion')
                        publicacion.classList.add('grid_publicacion')
                        publicacion.setAttribute('id', `pub_e_list${p.id}`)
                        publicacion.innerHTML = `
                            <h4 class='titulo_pub'>${p.nombre}</h4>
                            <h5 class='user_pub'>${p.usuario_id}</h5>
                            <h5 class='coment_pub'>Comentarios: ${p.cant_comentarios}</h5>
                            <div class="div_btn_fav">
                                <i class="fa-solid fa-star fa-2x" id='btn_fav_${p.id}'></i>
                            </div>
                            <div class='div_fecha'>
                                <h5>${fecha_creacion[0]}</h5>
                            </div>
                            
                        `
                        listaIds.push(p.id)
                        //funcion detalle publicacion
                        publicacion.addEventListener('click', function () { agregarEventoPublicacion(p.id) })
                        fragmento.appendChild(publicacion)

                    }
                })
                publicacion_container.appendChild(fragmento)
                //agrego el evento favoritos
                listaIds.forEach(id => {
                    favoritos(id)

                })
                //oculto el paginator
                paginador.classList.add('ocultar')

                //No se encontraron resultados
                if (publicacion_container.childNodes.length === 0) {
                    alerta = document.createElement('p')
                    alerta.classList.add('alerta')
                    alerta.innerHTML = 'No se encontraron resultados'
                    fragmento.appendChild(alerta)
                    publicacion_container.appendChild(fragmento)
                }
            } else {
                paginador.classList.remove('ocultar')
                calcCantidadPaginas(10)
                mostrarElementosDePagina(1, data.publicaciones, 10)
            }

        }

    })
}

//**************************************************************************** */

// Calcular la cantidad de páginas necesarias
//recibe como parámetro las cantidad de elementos que se mostrarán x página
const calcCantidadPaginas = (elementosPorPagina) => {
    cantidadDePaginas = Math.ceil((data.publicaciones).length / elementosPorPagina);
}

// Función que muestra los elementos de una página
// parametros: paginaActual, lista y n (cantidad de elementos que se mostrarán x página)
const mostrarElementosDePagina = (pagina, lista, elementosPorPagina) => {
    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const elementosEnPagina = lista.slice(inicio, fin);
    publicacion_container.innerHTML = ''
    fragmento = document.createDocumentFragment();

    renderPublicaciones(elementosEnPagina, fragmento, publicacion_container);

    actualizarBotonesDeNavegacion(pagina, data.publicaciones, cantidadDePaginas);
};

// Función que actualiza los botones de navegación
const actualizarBotonesDeNavegacion = (paginaActual, lista, fin) => {
    const paginadorHTML = document.getElementById('paginador');
    paginadorHTML.innerHTML = '';

    if (paginaActual > 1) {
        const li = document.createElement('li');
        const enlace = document.createElement('a');
        enlace.innerText = 'Anterior';
        enlace.classList.add('lado')
        enlace.addEventListener('click', () => {
            mostrarElementosDePagina(paginaActual - 1, lista, 10); //10 -> elementosPorPagina
        });
        li.appendChild(enlace);
        paginadorHTML.appendChild(li);
    }
    if (paginaActual < cantidadDePaginas) {
        const li = document.createElement('li');
        const enlace = document.createElement('a');
        li.classList.add('lado')
        enlace.innerText = 'Siguiente';
        enlace.classList.add('lado,ult_lado')
        enlace.addEventListener('click', () => {
            mostrarElementosDePagina(paginaActual + 1, lista, 10); //10 -> elementosPorPagina
        });
        li.appendChild(enlace);
        paginadorHTML.appendChild(li);
    }

    for (let i = 1; i <= cantidadDePaginas; i++) {
        const li = document.createElement('li');
        li.classList.add('paginas')
        const enlace = document.createElement('a');
        enlace.innerText = i;
        enlace.addEventListener('click', () => {
            mostrarElementosDePagina(i, (data.publicaciones), 10); //10 -> elementosPorPagina
        })
        li.appendChild(enlace);
        i == paginaActual && li.classList.add('activo')
        paginadorHTML.appendChild(li)
    }

}



//Iniciador 
window.addEventListener('load', async () => {
    await listarPublicaciones();
    buscador();
})
