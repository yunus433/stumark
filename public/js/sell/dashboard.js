window.onload = () => {
  document.addEventListener('click', (event) => {
    if (event.target.className == '--s_product_image_change') {
      event.target.parentNode.parentNode.childNodes[0].childNodes[0].src = event.target.src;
      event.target.parentNode.querySelector('.--s_selected_photo').classList.remove('--s_selected_photo');
      event.target.classList.add('--s_selected_photo');
    };
  });
};
