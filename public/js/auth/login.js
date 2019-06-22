window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const form = document.getElementById('register-form');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');

  const errorLineNotExist = document.getElementById('error-line-not-exist');
  const errorLineNotValid = document.getElementById('error-line-not-valid');

  form.onsubmit = (event) => {
    event.preventDefault();
    if (!emailInput.value || !passwordInput.value) {
      errorLineNotExist.style.display = 'flex';

      if (errorLineNotValid) errorLineNotValid.style.display = 'none';

      errorLineNotExist.classList.add('--auth_g_animation_class');
      setTimeout(() => {
        errorLineNotExist.classList.remove('--auth_g_animation_class');
      }, 500);
    } else {
      form.submit();
    }
  };
}
