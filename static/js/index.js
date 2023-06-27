const ultimas_publicaciones= async() => {
    try {
        const response = await fetch('./publicaciones_json');
        data = await response.json()
        data.publicaciones = data.publicaciones.reverse()
        publicaciones =  data.publicaciones.splice(0, 3)
        if (data.message === 'Success') {
            publicaciones.forEach(p => {
                
                fecha_creacion = p.fecha_creacion.split('T')
                publicacion = document.createElement('div')
                publicacion.classList.add('publicacion')
                publicacion.classList.add('grid_publicacion')
                publicacion.setAttribute('id', `pub_e_list${p.id}`)
                publicacion_container.appendChild(publicacion)
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

                publicacion.addEventListener('click', function() {agregarEventoPublicacion(p.id)} )
                favoritos(p.id)
                try{
                    if(lista_data_fav_id.includes(p.id)) {
                        btn_fav = document.getElementById(`btn_fav_${p.id}`)
                        btn_fav.classList.add('fa-solid')
                        btn_fav.classList.remove('fa-regular')
                    }
                }catch {
                    
                }
                
                
                    
                

            });


            
        }else {
            console.log('publicaciones no encontradas')
        }
    } catch (error){
        console.log(error);
    }
}

const url = window.location.href


const agregarEventoPublicacion = (id) => {
    location.href = url + `/publicaciones/${id}`
}


window.addEventListener('load', async() => {
    await ultimas_publicaciones();
    
})