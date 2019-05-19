window.onload = () => {
  const form = document.getElementById('new-product-form');
  const nameInput = document.getElementById('name-input');
  const priceInput = document.getElementById('price-input');
  const descriptionInput = document.getElementById('description-input');
  const keywordsInput = document.getElementById('keywords-input');
  const sendButton = document.getElementById('form-send-button');
  const errorLine = document.getElementById('form-error');

  document.addEventListener('click', (event) => {
    if (event.target.className == '--g_form_button') {
      if (!nameInput.value || !priceInput.value || !descriptionInput.value) {
        errorLine.innerHTML = "Please write all the information";
      } else if (!keywordsInput.value) {
        errorLine.innerHTML = "You should write at least one keyword for your product";
      } else {
        if (keywordsInput.value.trim().split(" ").length > 10) {
          errorLine.innerHTML = "You may write 10 keywords at most";
        } else {
          form.submit();
        }
      }
    }
  });
};
