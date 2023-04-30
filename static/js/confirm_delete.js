let list_btn_delete_pub = document.querySelectorAll('.btn_delete_pub');

const borrar_pub = (nombre, id, url) => {
    Swal.fire({
        title: `¿Deseas borrar "${nombre}"?`,
        text: "No podrás revertir este cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Completado!',
                'Publicación borrada',
                'success'
              )
          setTimeout(function(){location.href = url}, 1000)
        }
      })
}

list_btn_delete_pub.forEach((btn)=> {
    let jsonString = btn.value
    let jsonObject = JSON.parse(btn.value)
    let nombre= jsonObject.nombre
    let id = jsonObject.id
    let url = jsonObject.url
    btn.addEventListener('click', function() {borrar_pub(nombre, id, url)});
})