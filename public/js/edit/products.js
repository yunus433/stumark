window.onload = () => {
  document.addEventListener('click', (event) => {
    if (event.target.className == '--s_product_image_change') {
      document.querySelector('.--s_product_image').src = event.target.src;
      document.querySelector('.--s_product_image_form').action = "/edit/product/photo/?index=" + event.target.id.split("_")[1] + "&id=" + document.querySelector('.--s_product_image_form').action.split("=")[2];
      document.querySelector('.--s_selected_photo').classList.remove('--s_selected_photo');
      event.target.classList.add('--s_selected_photo');
    };
  });

  document.querySelector('.--g_display_none').onchange = (event) => {
    document.querySelector('.--s_product_image_form').submit();
  };
};
