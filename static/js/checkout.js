url = '/donaciones/checkout';

container = document.getElementById('donaciones_container')

listBtn = document.querySelectorAll('.donacion_item')
listBtn.forEach(element => {
    element.addEventListener('click', function() {
        const valor = element.getAttribute('value')
        redirectDonacion(valor)
    })
});
/*
const form = document.querySelector('.div_donacion_custom');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const input = document.querySelector('#donacion_custom');
    const valor_custom = input.value;
    redirectDonacion(valor_custom)

});
*/

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
const redirectDonacion = (valor) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);  // Agregar el token de seguridad en el encabezado

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('OOOKKK')
                //let response = JSON.parse(xhr.responseText);
                console.log(xhr.response)
                container.innerHTML = xhr.response
                //btn = document.getElementById('btn')
                mp_checkout()
                //prueba_fx(btn)
                
                
            } else {
                console.log('error')
                throw new Error('Error en la solicitud: ' + xhr.status);
            }
        }

        xhr.onerror = function () {

            // Ha ocurrido un error en la solicitud
        };
    }

    let requestData = { monto: valor };  // Objeto con la lista de datos
    xhr.send(JSON.stringify(requestData));

};

const mp_checkout = (tag) => {
    const preferenciaTag = document.getElementById('preferencia');
    const preferenciaId = preferenciaTag.dataset.value;
    const mp = new MercadoPago('APP_USR-3434a96f-751a-4fff-82c1-fa3e6c85ee77');
    const bricksBuilder = mp.bricks();
    mp.bricks().create("wallet", "wallet_container", {
    initialization: {
        preferenceId: preferenciaId,
        },
    });
}

const prueba_fx = () => {
    btn.addEventListener('click', function () {
        alert('hola')
    })
}