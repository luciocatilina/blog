publicacion_container_favoritos.innerHTML = ''
fragmentoFav = document.createDocumentFragment();


//HREF DETALLE PUBLICACION
const agregarEventoPublicacion = (id) => {
    location.href = `/publicaciones/${id}`
}


let data_fav
let data

let lista_data_fav_id = []
let lista_data

// FETCH Favoritos_JSON

const listarFavoritos = async () => {
    try {
        const response = await fetch('./listado/favoritos/json');
        data_fav = await response.json()
        data_fav.favoritos = data_fav.favoritos.reverse()
        if (data_fav.message === 'Success') {
            data_fav.favoritos.forEach((p) => {
                lista_data_fav_id.push(p.publicacion_id)
            })
        } else {
            console.log('Favoritos no encontradas')
        }

    } catch (error) {
        console.log(error);
    }
}

const listarPublicaciones = async () => {
    try {
        const response = await fetch('./publicaciones_json');
        data = await response.json()
        data.publicaciones = data.publicaciones.reverse()
        if (data.message === 'Success') {
            lista_data = data.publicaciones
            await listarFavoritos();
            renderPublicaciones(lista_data, fragmentoFav, publicacion_container_favoritos, lista_data_fav_id)

        } else {
            console.log('publicaciones no encontradas')
        }

    } catch (error) {
        console.log(error);
    }
}

//F(X) RENDER PUBLICACIONES
const renderPublicaciones = (lista, fragmento, publicacion_container, lista_id_fav) => {
    lista.forEach(p => {
        if (lista_id_fav.includes(p.id)) {
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
        }

    });
    publicacion_container.appendChild(fragmento)

    lista_id_fav.forEach(p => {

        btn_fav = document.getElementById(`btn_fav_${p}`)
        btn_fav.classList.add('fa-solid')
        btn_fav.classList.remove('fa-regular')

        //funcion favoritos
        favoritos(p)
    })
    //<i class="fa-regular fa-star fa-2x" id="fav"></i>
}


//Iniciador 
window.addEventListener('load', async () => {
    await listarPublicaciones();
})
