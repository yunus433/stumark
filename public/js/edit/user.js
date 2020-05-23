window.onload = () => {
  addEventListener(document);

  const formWrapper = document.querySelector('.form-wrapper');
  const passwordFormWrapper = document.querySelector('.password-form-wrapper');

  document.addEventListener('click', (event) => {
    if (event.target.className == 'change-password-button' || event.target.parentNode.className == 'change-password-button') {
      formWrapper.style.display = 'none';
      passwordFormWrapper.style.display = 'flex';
    }
    
    if (event.target.className == 'back-password-button' || event.target.parentNode.className == 'back-password-button') {
      formWrapper.style.display = 'flex';
      passwordFormWrapper.style.display = 'none';
    }

    if (event.target.className == 'send-form-button' || event.target.parentNode.className == 'send-form-button') {
      if (document.querySelector('#name-input').value) {
        document.querySelector('.form-wrapper').submit();
      }
      else {
        document.querySelector('.error-line').innerHTML = "İsmini silemezsin!"
      }
    }

    if (event.target.className == 'send-form-button-password' || event.target.parentNode.className == 'send-form-button-password') {
      if (!document.querySelector('#old-password-input').value) {
        document.querySelector('.password-error-line').innerHTML = "Eski şifreni girmelisin.";
      } else if (document.querySelector('#new-password-input').value != document.querySelector('#new-password-two').value || !document.querySelector('#new-password-two').value) {
        document.querySelector('.password-error-line').innerHTML = "Lütfen yeni şifreni onayla.";
      } else if (document.querySelector('#new-password-input').value.length < 6) {
        document.querySelector('.password-error-line').innerHTML = "Yeni şifren en az 6 karakterli olmalı.";
      } else {
        document.querySelector('.password-form-wrapper').submit();
      }
    }
  });

  const userImage = document.querySelector('.user-profile-image');
  const userPhotoInput = document.getElementById('user-image-input');
  const imageSpan = document.querySelector('.user-profile-image-span');

  userPhotoInput.onchange = (event) => {
    imageSpan.innerHTML = "Yükleniyor";
    const file = userPhotoInput.files[0];
    var formdata = new FormData();
    formdata.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/edit/user/photo");
    xhr.send(formdata);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.responseText) {
        if (xhr.status == 500) {
          imageSpan.innerHTML = 'Profilbild bearbeiten'
          alert("Bir hata oluştu, lütfen tekrar dene");
          userPhotoInput.value = ''
          if (!/safari/i.test(navigator.userAgent)){
            userPhotoInput.type = ''
            userPhotoInput.type = 'file'
          }
        } else {
          imageSpan.innerHTML = 'Profilbild bearbeiten'
          userPhotoInput.value = ''
          if (!/safari/i.test(navigator.userAgent)){
            userPhotoInput.type = ''
            userPhotoInput.type = 'file'
          }
          userImage.src = xhr.responseText;
        }
      };
    };
  };
};
