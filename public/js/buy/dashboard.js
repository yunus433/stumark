window.onload = () => {
  document.addEventListener('click', (event) => {
    if (event.target.className == '--s_product_image_change') {
      event.target.parentNode.parentNode.childNodes[0].childNodes[0].src = event.target.src;
      event.target.parentNode.querySelector('.--s_selected_photo').classList.remove('--s_selected_photo');
      event.target.classList.add('--s_selected_photo');
    };
  });

  const searchInput = document.querySelector('.--g_text_input');
  searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
      window.location.href='/buy/?page=1&keywords=' + searchInput.value;
    };
  });
};
