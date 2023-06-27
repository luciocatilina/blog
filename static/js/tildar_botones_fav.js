let data_fav

let lista_data_fav_id = []


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
        //console.log(error);
    }
}

//Iniciador 
window.addEventListener('load', async () => {
    await listarFavoritos();
})