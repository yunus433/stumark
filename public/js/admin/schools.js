window.onload = () => {
  document.addEventListener('click', event => {
    if (event.target.className == 'new-school-button' || event.target.parentNode.className == 'new-school-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'none';
      document.querySelector('.new-form-wrapper').style.display = 'flex';
    }

    if (event.target.className == 'back-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'flex';
      document.querySelector('.new-form-wrapper').style.display = 'none';
    }
  });
}
