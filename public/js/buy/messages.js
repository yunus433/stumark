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
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu') {
      userMenu.style.display = 'flex';
      userMenuResponsive.style.display = 'flex';
      contentBarResponsive.style.display = 'none';
    } else if (event.target.className == 'change-category-button' || event.target.parentNode.className == 'change-category-button' || event.target.className == 'content-bar-responsive' || event.target.parentNode.className == 'content-bar-responsive') {
      contentBarResponsive.style.display = 'flex';
      userMenuResponsive.style.display = 'none';
    } else {
      contentBarResponsive.style.display = 'none';
      userMenu.style.display = 'none';
      userMenuResponsive.style.display = 'none';
    }
  });

  const messagesBlock = document.querySelector('.messages-content');
  messagesBlock.scrollTop = messagesBlock.scrollHeight;

  document.addEventListener('click', (event) => {
    if (event.target.className == 'product-menu-image') {
      event.target.parentNode.parentNode.childNodes[0].childNodes[0].src = event.target.src;
      event.target.parentNode.querySelector('.selected-menu-image').classList.remove('selected-menu-image');
      event.target.classList.add('selected-menu-image');
    }

    if (event.target.classList.contains('fa-times')) {
      document.querySelector('.messages-right-side').style.display = 'none';
      document.querySelector('.reopen-right-side-button').style.display = 'flex';
    }

    if (event.target.className == 'reopen-right-side-button' || event.target.parentNode.className == 'reopen-right-side-button') {
      document.querySelector('.messages-right-side').style.display = 'flex';
      document.querySelector('.reopen-right-side-button').style.display = 'none';
    }
  });
};
