const agregarEventoBotonVerPublicacion = (id) => {
    btn = document.getElementById(`boton_ver_pub_${id}`)
    btn.addEventListener('click', function() {
        location.href = `./publicacion/${id}`

    })
}

let data  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const listarPublicaciones =  async () => {
    try {
        const response = await fetch('./publicaciones_json');
         data = await response.json()
        if (data.message === 'Success') {
            data.publicaciones.forEach((p) => {
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

            })
        }else {
            console.log('publicaciones no encontradas')
        }

    } catch (error){
        console.log(error);
    }
}

const buscador = async() => {
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
            console.log(e.target.value)
        }
        
    })
}


window.addEventListener('load', async() => {
    await listarPublicaciones();
    buscador();
})