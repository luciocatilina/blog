const destildarBotonesFav = () => {
    let listBtnFav = document.querySelectorAll('[id^="btn_fav_"]');
    listBtnFav.forEach(function (btn) {
        if (btn.classList.contains('fa-solid')) {
            btn.classList.remove('fa-solid');
            btn.classList.add('fa-regular');
        }
    });
}
