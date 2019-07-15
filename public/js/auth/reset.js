window.onload = (req, res, next) => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const passwordForm = document.getElementById('password-reset-form');
  const emailForm = document.getElementById('email-send-form');
  const errorLine = document.querySelector('.each-error-line');

  if (passwordForm)
    passwordForm.onsubmit = (event) => {
      const passwordOneInput = document.getElementById('password-one');
      const passwordTwoInput = document.getElementById('password-two');

      event.preventDefault();
        if (passwordOneInput.value.length < 6 || passwordTwoInput.value.length < 6) {
          errorLine.innerHTML = 'Dein Passwort muss mindestens 6-stellig sein!';
        }
        else if (passwordOneInput.value != passwordTwoInput.value) {
          errorLine.innerHTML = 'Bitte bestätige dein Passwort!';
        }
        else {
          passwordForm.submit();
        }
    };

  if (emailForm)
    emailForm.onsubmit = (event) => {
      if (!document.getElementById('email-input').value) {
        errorLine.innerHTML = 'Please enter your email';
      }
      else {
        emailForm.submit();
      };
    };
}
