//F(X) BTN FAV
const favoritos = (id) => {
  btn_fav = document.getElementById(`btn_fav_${id}`)
  btn_fav.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      //alert('fav')
      btn = document.getElementById(`btn_fav_${id}`)
      btn.classList.add('fa-solid')
      btn.classList.remove('fa-regular')
      

      localStorage.setItem('favs', JSON.stringify(listFavPub))


      if (listFavPub.includes(id)) {
          btn.classList.remove('fa-solid')
          btn.classList.add('fa-regular')
          indice = listFavPub.indexOf(id)
          indice !== -1 && listFavPub.splice(indice, 1)
          localStorage.setItem('favs', JSON.stringify(listFavPub))

          //************************ENVIO ID PARA BORRAR DE BD ********/
          //***********************************************************/
          //envios al servidor */
          FuncionEnvioIdBorrar(id, JSON.parse(localStorage.getItem('favs')))
          //***************** */

          Toastify({

              text: "Eliminado de favoritos",

              className: 'degrade_remove',

              offset: {
                  y: 60

              },

              duration: 2000

          }).showToast();

      } else {

          listFavPub.push(id)
          localStorage.setItem('favs', JSON.stringify(listFavPub))
          //envios al servidor
          enviarfavLocalStorage(JSON.parse(localStorage.getItem('favs')))



          Toastify({

              text: "Añadido a favoritos",

              className: 'degrade_add',

              offset: {
                  y: 60

              },
              duration: 2000

          }).showToast();

      }
  })
}