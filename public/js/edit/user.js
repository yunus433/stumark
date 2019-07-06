window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const searchBar = document.querySelector('.search-bar-wrapper');
  searchBar.onsubmit = (event) => {
    event.preventDefault();
    window.location.href = '/buy/?page=0&category=all&limit=50&keywords=' + searchBar.childNodes[0].value;
  }

  const userMenu = document.querySelector('.user-menu');
  const userMenuResponsive = document.querySelector('.user-menu-responsive');
  const contentBarResponsive = document.querySelector('.content-bar-responsive');

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu' || event.target.className == 'user-menu-responsive' || event.target.parentNode.className == 'user-menu-responsive') {
      if (userMenu) userMenu.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'flex';
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
    } else if (event.target.className == 'change-category-button' || event.target.parentNode.className == 'change-category-button' || event.target.className == 'content-bar-responsive' || event.target.parentNode.className == 'content-bar-responsive') {
      if (contentBarResponsive) contentBarResponsive.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    } else {
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
      if (userMenu) userMenu.style.display = 'none';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    }
  });
  document.addEventListener('touchstart', (event) => {
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu' || event.target.className == 'user-menu-responsive' || event.target.parentNode.className == 'user-menu-responsive') {
      if (userMenu) userMenu.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'flex';
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
    } else if (event.target.className == 'change-category-button' || event.target.parentNode.className == 'change-category-button' || event.target.className == 'content-bar-responsive' || event.target.parentNode.className == 'content-bar-responsive') {
      if (contentBarResponsive) contentBarResponsive.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    } else {
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
      if (userMenu) userMenu.style.display = 'none';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    }
  });

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
        document.querySelector('.error-line').innerHTML = "You can't delete your name"
      }
    }

    if (event.target.className == 'send-form-button-password' || event.target.parentNode.className == 'send-form-button-password') {
      if (!document.querySelector('#old-password-input').value) {
        document.querySelector('.password-error-line').innerHTML = "You must enter your old password";
      } else if (document.querySelector('#new-password-input').value != document.querySelector('#new-password-two').value || !document.querySelector('#new-password-two').value) {
        document.querySelector('.password-error-line').innerHTML = "Bitte bestätige dein Passwort!";
      } else if (document.querySelector('#new-password-input').value.length < 6) {
        document.querySelector('.password-error-line').innerHTML = "Dein Passwort muss mindestens 6-stellig sein!";
      } else {
        document.querySelector('.password-form-wrapper').submit();
      }
    }
  });

  const userImage = document.querySelector('.user-profile-image');
  const userPhotoInput = document.getElementById('user-image-input');
  const imageSpan = document.querySelector('.user-profile-image-span');

  userPhotoInput.onchange = (event) => {
    imageSpan.innerHTML = "Bitte kurz warten";
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
          alert("Entschuldigung, dass es ein Error gibt. Versuchen Sie es nochmal bitte!");
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
