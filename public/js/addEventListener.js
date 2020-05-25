addEventListener = (document) => {
  const searchBars = document.querySelectorAll('.search-bar-wrapper');

  searchBars.forEach(searchBar => {
    searchBar.onsubmit = (event) => {
      event.preventDefault();
      window.location.href = '/buy/?page=0&category=all&limit=50&keywords=' + searchBar.childNodes[0].value;
    }
  });

  const userMenus = document.querySelectorAll('.user-menu');
  const userNameWrapper = document.querySelector('.user-name-wrapper');

  document.addEventListener('mouseover', event => {
    if (userNameWrapper && (event.target.className == 'header-login-wrapper' || event.target.parentNode.className == 'header-login-wrapper' || event.target.parentNode.parentNode.className == 'header-login-wrapper' || event.target.parentNode.parentNode.parentNode.className == 'header-login-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu')) {
      userMenus[0].style.display = 'flex';
    } else {
      userMenus[0].style.display = 'none';
    }
  });

  document.addEventListener('click', event => {
    if (userNameWrapper && (event.target.className == 'header-login-wrapper' || event.target.parentNode.className == 'header-login-wrapper' || event.target.parentNode.parentNode.className == 'header-login-wrapper' || event.target.parentNode.parentNode.parentNode.className == 'header-login-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu')) {
      userMenus[1].style.display = 'flex';
    } else {
      userMenus[1].style.display = 'none';
    }

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
