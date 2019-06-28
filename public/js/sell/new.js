const productPhotoNameArray = [];

function createNewProductPhoto(imageSrc) {  
  productPhotoNameArray.push(imageSrc);

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('each-product-photo');
  const image = document.createElement('img');
  image.src= "/res/uploads/" +imageSrc;
  imageWrapper.appendChild(image);

  if (productPhotoNameArray.length >= 5) {
    document.querySelector('.add-new-button').style.display = 'none';
  }

  document.getElementById('file-name-array').value = productPhotoNameArray.join();
  document.querySelector('.images-wrapper').appendChild(imageWrapper);
  document.querySelector('.images-wrapper').insertBefore(imageWrapper, imageWrapper.previousElementSibling);
}

window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const searchBar = document.querySelector('.search-bar-wrapper');
  searchBar.onsubmit = (event) => {
    event.preventDefault();
    window.location.href = '/buy/?page=0&category=all&limit=50&keywords=' + searchBar.childNodes[0].value;
  };

  document.addEventListener('mouseover', (event) => {
    const userMenu = document.querySelector('.user-menu');
    
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu') {
      userMenu.style.display = 'flex';
    } else {
      userMenu.style.display = 'none';
    }
  });

  const productPhotoInput = document.getElementById('product-image-input');
  productPhotoInput.onchange = (event) => {
    const file = productPhotoInput.files[0];
    var formdata = new FormData();
    formdata.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/sell/new/photo");
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

  const priceInput = document.querySelector('.price-input');
  const priceInputButton = document.getElementById('custom-price-input');
  priceInput.oninput = (event) => {
    priceInputButton.checked = true;
    priceInputButton.value = priceInput.value;
  }
};
