const productPhotoNameArray = [];

function createNewProductPhoto(imageSrc) {  
  productPhotoNameArray.push(imageSrc);

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('each-product-photo');
  const image = document.createElement('img');
  image.src = imageSrc;
  imageWrapper.appendChild(image);

  if (productPhotoNameArray.length >= 5) {
    document.querySelector('.add-new-button').style.display = 'none';
  }

  document.getElementById('file-name-array').value = productPhotoNameArray.join();
  document.querySelector('.images-wrapper').appendChild(imageWrapper);
  document.querySelector('.images-wrapper').insertBefore(imageWrapper, imageWrapper.previousElementSibling);
  document.querySelector('.images-wrapper').insertBefore(imageWrapper, imageWrapper.previousElementSibling);
  document.querySelector('.images-outer-wrapper').scrollLeft =  document.querySelector('.images-outer-wrapper').scrollWidth;
}

window.onload = () => {
  addEventListener(document);

  const productPhotoInput = document.getElementById('product-image-input');
  productPhotoInput.onchange = (event) => {
    document.querySelector('.uploading-image-wrapper').style.display = "flex";
    const file = productPhotoInput.files[0];
    var formdata = new FormData();
    formdata.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/sell/new/photo");
    xhr.send(formdata);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.responseText){
        document.querySelector('.uploading-image-wrapper').style.display = "none";
        if (xhr.status == 500) {
          alert("Bir hata oluştu, lütfen tekrar deneyin.");
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
