window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const searchBar = document.querySelector('.search-bar-wrapper');
  searchBar.onsubmit = (event) => {
    event.preventDefault();
    window.location.href = '/buy/?page=0&category=all&limit=50&keywords=' + searchBar.childNodes[0].value;
  }

  document.addEventListener('mouseover', (event) => {
    const userMenu = document.querySelector('.user-menu');
    
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu') {
      userMenu.style.display = 'flex';
    } else {
      userMenu.style.display = 'none';
    }
  });
  
  document.addEventListener('click', (event) => {
    if (event.target.className == 'product-menu-image') {
      event.target.parentNode.parentNode.childNodes[0].childNodes[0].src = event.target.src;
      event.target.parentNode.querySelector('.selected-menu-image').classList.remove('selected-menu-image');
      event.target.classList.add('selected-menu-image');
    }
  });
};
