window.onload = () => {
  const form = document.querySelector('.--s_left_side_wrapper');

  document.addEventListener('click', (event) => {
    if (event.target.className == '--s_product_image_change') {
      document.querySelector('.--s_product_image').src = event.target.src;
      form.action = "/edit/product/photo/?index=" + event.target.id.split("_")[1] + "&id=" + form.action.split("=")[2];
      document.querySelector('.--s_selected_photo').classList.remove('--s_selected_photo');
      event.target.classList.add('--s_selected_photo');
    };
  });

  document.querySelector('.--g_display_none').onchange = (event) => {
    form.submit();
  };
};
