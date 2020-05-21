window.onload = () => {
  const form = document.querySelector('.form-wrapper');
  const error = document.querySelector('.each-error-line');
  form.onsubmit = (event) => {
    event.preventDefault();
    

    if (document.getElementById('password-input-one').value.length < 6 || document.getElementById('password-input-two').value.length < 6) {
      error.innerHTML = 'Şifreniz en az 6 karakterli olmalı.';
    }
    else if (document.getElementById('password-input-one').value != document.getElementById('password-input-two').value) {
      error.innerHTML = 'Lütfen şirenizi tekrar girin.';
    }
    else {
      form.submit();
    }
  }
}
