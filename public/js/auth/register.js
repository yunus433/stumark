window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const form = document.getElementById('register-form');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');

  const errorLineNotExist = document.getElementById('error-line-not-exist');
  const errorLineShortPassword = document.getElementById('error-line-short-password');

  const errorLineNotValid = document.getElementById('error-line-not-valid');
  const errorLineTakenEmail = document.getElementById('error-line-taken-email');

  form.onsubmit = (event) => {
    event.preventDefault();
    if (!emailInput.value || !passwordInput.value) {
      errorLineNotExist.style.display = 'flex';

      if (errorLineTakenEmail) errorLineTakenEmail.style.display = 'none';
      if (errorLineNotValid) errorLineNotValid.style.display = 'none';

      errorLineNotExist.classList.add('--auth_g_animation_class');
      setTimeout(() => {
        errorLineNotExist.classList.remove('--auth_g_animation_class');
      }, 500);
    } else if (passwordInput.value.length < 6) {
      errorLineShortPassword.style.display = 'flex';

      if (errorLineTakenEmail) errorLineTakenEmail.style.display = 'none';
      if (errorLineNotValid) errorLineNotValid.style.display = 'none';

      errorLineShortPassword.classList.add('--auth_g_animation_class');
      setTimeout(() => {
        errorLineShortPassword.classList.remove('--auth_g_animation_class');
      }, 500);
    } else {
      form.submit();
    }
  };
}
