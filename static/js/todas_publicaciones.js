const agregarEventoBotonVerPublicacion = (id) => {
    btn = document.getElementById(`boton_ver_pub_${id}`)
    btn.addEventListener('click', function() {
        location.href = `./publicacion/${id}`

    })
}

let cantidadDePaginas
const elementosPorPagina = 10;

let data  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const listarPublicaciones =  async () => {
    try {
        const response = await fetch('./publicaciones_json');
        data = await response.json()
        if (data.message === 'Success') {
            calcCantidadPaginas()
            mostrarElementosDePagina(1, data.publicaciones)
        }else {
            console.log('publicaciones no encontradas')
        }

    } catch (error){
        console.log(error);
    }
}

//BUSCADOR
const buscador = () => {
    document.addEventListener('keyup', (e)=> {
        if (e.target.matches('#buscador_input')) {
            //e.target.value
            data.publicaciones.forEach((p) => {
                elemento = document.getElementById(`pub_e_list${p.id}`)
                if (p.nombre.toLowerCase().includes(e.target.value.toLowerCase())){
                    elemento.classList.remove('ocultar')
                    elemento.classList.add('mostrar')
                    

                }else {
                    elemento.classList.add('ocultar')
                    elemento.classList.remove('mostrar')
                }
            })
        }
        
    })
}

//**************************************************************************** */

// Calcular la cantidad de páginas necesarias
const calcCantidadPaginas =  () => {
    cantidadDePaginas = Math.ceil((data.publicaciones).length / elementosPorPagina);
}

// Función que muestra los elementos de una página
const mostrarElementosDePagina = (pagina, lista) => {
    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const elementosEnPagina = lista.slice(inicio, fin);
    publicacion_container.innerHTML = ''

    elementosEnPagina.forEach(p => {
        fecha_creacion = p.fecha_creacion.split('T')
        publicacion = document.createElement('div')
        publicacion.classList.add('publicacion')
        publicacion.setAttribute('id', `pub_e_list${p.id}`)
        publicacion_container.appendChild(publicacion)
        publicacion.innerHTML = `
            <div class="info">
                <h4>${p.nombre}</h4>
                <h5>${p.usuario_id}</h5>
                <h5>${fecha_creacion[0]}</h5>
            </div>
            <div class="div_boton">
                <button class="boton ver_pub" id='boton_ver_pub_${p.id}'>Ver publicación</button>
            </div>
            
        `
         
        agregarEventoBotonVerPublicacion(p.id)
        });

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
            mostrarElementosDePagina(paginaActual - 1, lista);
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
            mostrarElementosDePagina(paginaActual + 1, lista);
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
            mostrarElementosDePagina(i, (data.publicaciones))
        })
        li.appendChild(enlace);
        i == paginaActual && li.classList.add('activo')
        paginadorHTML.appendChild(li)
    }

}

window.addEventListener('load', async() => {
    await listarPublicaciones();
    buscador();
})