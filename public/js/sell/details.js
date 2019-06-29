function createNewProductPhoto(imageSrc) {  
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('each-product-photo');
  const image = document.createElement('img');
  image.src= imageSrc;
  const i = document.createElement('i');
  i.classList.add('each-product-edit-icon');
  i.classList.add('fas');
  i.classList.add('fa-trash');
  imageWrapper.appendChild(image);
  imageWrapper.appendChild(i);

  if (document.querySelector('.images-wrapper').childNodes.length >= 5) {
    document.querySelector('.add-new-button').style.display = 'none';
  }

  document.querySelector('.images-wrapper').appendChild(imageWrapper);
  document.querySelector('.images-wrapper').insertBefore(imageWrapper, imageWrapper.previousElementSibling);
  document.querySelector('.images-outer-wrapper').scrollLeft =  document.querySelector('.images-outer-wrapper').scrollWidth;
  responsiveDesign(imageWrapper);
}


window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const searchBar = document.querySelector('.search-bar-wrapper');
  searchBar.onsubmit = (event) => {
    event.preventDefault();
    window.location.href = '/buy/?page=0&category=all&limit=50&keywords=' + searchBar.childNodes[0].value;
  };

  const userMenu = document.querySelector('.user-menu');
  const userMenuResponsive = document.querySelector('.user-menu-responsive');
  const contentBarResponsive = document.querySelector('.content-bar-responsive');

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu' || event.target.className == 'user-menu-responsive' || event.target.parentNode.className == 'user-menu-responsive') {
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

  const priceInput = document.querySelector('.price-input');
  const priceInputButton = document.getElementById('custom-price-input');
  priceInput.oninput = (event) => {
    priceInputButton.checked = true;
    priceInputButton.value = priceInput.value;
  }

  const productPhotoInput = document.getElementById('product-image-input');
  if (productPhotoInput)
    productPhotoInput.onchange = (event) => {
      const file = productPhotoInput.files[0];
      var formdata = new FormData();
      formdata.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/edit/product/photo/?id=" + document.getElementById('product-id').value);
      xhr.send(formdata);
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.responseText){
          if (xhr.status == 500) {
            alert("Entschuldigung, dass es ein Error gibt. Versuchen Sie es nochmal bitte!");
            productPhotoInput.value = ''
            if (!/safari/i.test(navigator.userAgent)){
              productPhotoInput.type = ''
              productPhotoInput.type = 'file'
            }
          } else {
            createNewProductPhoto(xhr.responseText);
            productPhotoInput.value = ''
            if (!/safari/i.test(navigator.userAgent)){
              productPhotoInput.type = ''
              productPhotoInput.type = 'file'
            }
          }
        };
      };
    };

  document.addEventListener('click', (event) => {
    if (event.target.className == 'each-product-edit-icon fas fa-trash') {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/edit/product/photoDelete/?id=" + document.getElementById('product-id').value);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
        "photo": event.target.parentNode.childNodes[0].src.toString()
      }));
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
          if (xhr.status == 200) {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
          } else {
            alert("Entschuldigung, dass es ein Error gibt. Versuchen Sie es nochmal bitte!");
          };
        };
      };
    };
  });
};
