//url favoritos
let url2 = '/agregar/favoritos/';

// Obtener el token de seguridad desde el cookie
let csrftoken = getCookie('csrftoken');
////////////////////////////////////////////////
//////////////-----------COOKIE-------------////
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let listFavPub

listFavPub = JSON.parse(localStorage.getItem('favs') || '[]') || []

if (listFavPub.length > 0) {
    try {
        enviarfavLocalStorage(listFavPub)
    }catch (e){
        //console.log(e)
    }
} 


//********************ENVIO ID A ELIMINAR DE FAVORITOS *******/
//*********************************************************** */
const FuncionEnvioIdBorrar = (id, lista) => {

    let xhr2 = new XMLHttpRequest();
    xhr2.open('POST', url2, true);
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr2.setRequestHeader('X-CSRFToken', csrftoken);


    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === XMLHttpRequest.DONE) {
            if (xhr2.status === 200) {
                //console.log('OOOKKK ID')
                //let response = JSON.parse(xhr.responseText);
                // Procesa la respuesta del servidor aquí
            } else {
                console.log('ERROR!!!! ID')
                throw new Error('Error en la solicitud: ' + xhr2.status);
            }
        }
    };


    let requestData2 = { borrarId: id , listaEnviar: lista};
    xhr2.send(JSON.stringify(requestData2));
}


//************************ENVIO DE LOCALSTORAGE***** */
//************************************************** */

function enviarfavLocalStorage  (lista)  {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url2, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);  // Agregar el token de seguridad en el encabezado

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //console.log('OOOKKK LISTA')
                //let response = JSON.parse(xhr.responseText);
                // Procesa la respuesta del servidor aquí
            } else {
                console.log('ERROR!!!! LISTA')
                throw new Error('Error en la solicitud: ' + xhr.status);
            }
        }

        xhr.onerror = function () {

            // Ha ocurrido un error en la solicitud
        };
    }

    let requestData = { listaEnviar: lista };  // Objeto con la lista de datos
    xhr.send(JSON.stringify(requestData));

};
