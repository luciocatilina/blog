form_crear_publicacion.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch(this.action, {
        method : 'POST',
        headers : {
            'X-Request-With' : 'XMLHttpRequest'
        },
        body: formData
    })

    .then(response => {
        if(response.ok) {
            return response.json
        }else {
            throw new Error('Error: ' + response.status)
        }
    })

    .then ( function () {
        form_crear_publicacion.reset()

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Publicacion creada',
            showConfirmButton: false,
            timer: 2000
          })
        }
    )

    .then(error =>  {
        console.log(error)
    })
})