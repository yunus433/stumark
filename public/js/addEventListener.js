addEventListener = (document) => {
  const searchBar = document.querySelector('.search-bar-wrapper');
  searchBar.onsubmit = (event) => {
    event.preventDefault();
    window.location.href = '/buy/?page=0&category=all&limit=50&keywords=' + searchBar.childNodes[0].value;
  }

  const userMenu = document.querySelector('.user-menu');

  document.addEventListener('mouseover', event => {
    if (event.target.className == 'header-login-wrapper' || event.target.parentNode.className == 'header-login-wrapper' || event.target.parentNode.parentNode.className == 'header-login-wrapper' || event.target.parentNode.parentNode.parentNode.className == 'header-login-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu') {
      userMenu.style.display = 'flex';
    } else if (event.target.className == 'change-category-button' || event.target.parentNode.className == 'change-category-button' || event.target.className == 'content-bar-responsive' || event.target.parentNode.className == 'content-bar-responsive') {
      if (contentBarResponsive) contentBarResponsive.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    } else {
      userMenu.style.display = 'none';
    }
  });
  document.addEventListener('touchstart', event => {
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

  document.addEventListener('click', event => {
    if (event.target.className == 'responsive-category-open-button' || event.target.parentNode.className == 'responsive-category-open-button') {
      document.querySelector('.content-bar-wrapper-responsive').classList.remove('close-to-left-animation-class');
      document.querySelector('.content-bar-wrapper-responsive').classList.add('open-from-left-animation-class');
    } else if (event.target.parentNode.className == 'close-button-line') {
      document.querySelector('.content-bar-wrapper-responsive').classList.remove('open-from-left-animation-class');
      document.querySelector('.content-bar-wrapper-responsive').classList.add('close-to-left-animation-class');
    } else if (!event.target.classList.contains('content-bar-wrapper-responsive') && !event.target.parentNode.classList.contains('content-bar-wrapper-responsive')) {
      if (document.querySelector('.content-bar-wrapper-responsive').classList.contains('open-from-left-animation-class')) {
        document.querySelector('.content-bar-wrapper-responsive').classList.remove('open-from-left-animation-class');
        document.querySelector('.content-bar-wrapper-responsive').classList.add('close-to-left-animation-class');
      }
    } 
  });
}
