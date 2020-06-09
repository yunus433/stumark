window.onload = () => {
  document.addEventListener('click', event => {
    if (event.target.className == 'new-user-button' || event.target.parentNode.className == 'new-user-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'none';
      document.querySelector('.new-form-wrapper').style.display = 'flex';
    }

    if (event.target.className == 'back-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'flex';
      document.querySelector('.new-form-wrapper').style.display = 'none';
    }
  });
}
