window.onload = () => {

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

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-message-button') || event.target.parentNode.classList.contains('buy-message-button')) {
      document.querySelector('.chose-buy-product-wrapper').style.display = 'grid';
      document.querySelector('.chose-message-type-wrapper').style.display = 'none';
      document.querySelector('.back-button-wrapper').style.display = 'block';
    }

    if (event.target.classList.contains('sell-message-button') || event.target.parentNode.classList.contains('sell-message-button')) {
      document.querySelector('.chose-sell-product-wrapper').style.display = 'grid';
      document.querySelector('.chose-message-type-wrapper').style.display = 'none';
      document.querySelector('.back-button-wrapper').style.display = 'block';
    }

    if (event.target.classList.contains('back-button') || event.target.parentNode.classList.contains('back-button')) {
      document.querySelector('.chose-buy-product-wrapper').style.display = 'none';
      document.querySelector('.chose-sell-product-wrapper').style.display = 'none';
      document.querySelector('.chose-message-type-wrapper').style.display = 'grid';
      document.querySelector('.back-button-wrapper').style.display = 'none';
    }
  })
}
