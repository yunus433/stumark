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

const getTowns = (city, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "/sell/town/?city=" + city, false);
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE){
      if (xhr.status == 400) {
        callback([]);
      } else {
        const response = xhr.responseText;
        callback(response);
      }
    };
  };

  xhr.send();
}

window.onload = () => {
  addEventListener(document);

  const productPhotoInput = document.getElementById('product-image-input');
  productPhotoInput.onchange = (event) => {
    document.querySelector('.uploading-image-wrapper').style.display = 'flex';
    const file = productPhotoInput.files[0];
    var formdata = new FormData();
    formdata.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/sell/new/photo');
    xhr.send(formdata);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.responseText){
        document.querySelector('.uploading-image-wrapper').style.display = 'none';
        if (xhr.status == 500) {
          alert('Bir hata oluştu, lütfen tekrar deneyin.');
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

  const subcategories = JSON.parse(document.getElementById('subcategories-array').value);
  const subcategoriesWrapper = document.querySelector('.subcategories-wrapper');
  const subcategoriesSelectWrapper = document.querySelector('.subcategories-wrapper');
  let selectedCategory = null;
  let clicked = false;

  const cities = JSON.parse(document.getElementById('cities').value);
  const selectCityWrapper = document.querySelector('.select-city-wrapper');
  const cityInput = document.getElementById('city-input');

  let towns = ["-"];
  const selectTownWrapper = document.querySelector('.select-town-wrapper');
  const townInput = document.getElementById('town-input');

  document.addEventListener('click', event => {
    if (event.target.className == 'each-category') {
      subcategoriesWrapper.innerHTML = '';
      selectedCategory = event.target.childNodes[0].value;
      document.querySelector('.select-subcategory-button').childNodes[0].value = subcategories[selectedCategory][0];
      subcategories[selectedCategory].forEach(sub => {
        const newsub = document.createElement('span');
        newsub.classList.add('select-each-subcategory');
        newsub.innerHTML = sub;
        subcategoriesWrapper.appendChild(newsub);
      });
    } else if (event.target.parentNode.className == 'each-category') {
      subcategoriesWrapper.innerHTML = '';
      selectedCategory = event.target.parentNode.childNodes[0].value;
      document.querySelector('.select-subcategory-button').childNodes[1].innerHTML = subcategories[selectedCategory][0];
      subcategories[selectedCategory].forEach(sub => {
        const newsub = document.createElement('span');
        newsub.classList.add('select-each-subcategory');
        newsub.innerHTML = sub;
        subcategoriesWrapper.appendChild(newsub);
      });
    }
    
    if (event.target.className == 'select-subcategory-button' || event.target.parentNode.className == 'select-subcategory-button') {
      subcategoriesSelectWrapper.style.display = clicked ? 'none' : 'block';
      document.querySelector('.select-subcategory-button').style.borderBottomLeftRadius = clicked ? '15px' : '0px';
      document.querySelector('.select-subcategory-button').style.borderBottomRightRadius = clicked ? '15px' : '0px';
      document.querySelector('.select-subcategory-button').style.borderBottomWidth = clicked ? '2px' : '0px';
      clicked = !clicked;
    } else if (event.target.className == 'select-each-category') {
      subcategoriesSelectWrapper.style.display = 'none';
      document.querySelector('.select-subcategory-button').style.borderBottomLeftRadius = '15px';
      document.querySelector('.select-subcategory-button').style.borderBottomRightRadius = '15px';
      document.querySelector('.select-subcategory-button').style.borderBottomWidth ='2px';
      clicked = !clicked;
      document.querySelector('.select-subcategory-button').childNodes[0].value = event.target.innerHTML;
      document.querySelector('.select-subcategory-button').childNodes[1].innerHTML = event.target.innerHTML;
    } else {
      subcategoriesSelectWrapper.style.display = 'none';
    }

    if (event.target.className == 'each-city-select') {
      getTowns(event.target.innerHTML, return_towns => {
        towns = return_towns.split('+');
        cityInput.value = event.target.innerHTML;
      });
    }

    if (event.target.className == 'each-town-select') {
      townInput.value = event.target.innerHTML;
    }
  });

  cityInput.onfocus = () => {
    selectCityWrapper.style.display = 'block';
    cityInput.style.borderBottomLeftRadius = "0px";
    cityInput.style.borderBottomRightRadius = "0px";
    cityInput.style.borderBottomWidth = "0px";
  }
  cityInput.oninput = () => {
    selectCityWrapper.innerHTML = "";
    cities.forEach(city => {
      if (city.toLocaleLowerCase().indexOf(cityInput.value.toLocaleLowerCase()) !== -1 || !cityInput.value.length) {
        const newSpan = document.createElement('span');
        newSpan.classList.add('each-city-select');
        newSpan.innerHTML = city;
        selectCityWrapper.appendChild(newSpan);

        while (cityInput.value.length && newSpan.previousElementSibling && city.toLocaleLowerCase().indexOf(cityInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(cityInput.value.toLocaleLowerCase()))
          selectCityWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
      }
    });
  }
  cityInput.onblur = () => {
    setTimeout(() => {
      selectCityWrapper.style.display = 'none';
      cityInput.style.borderBottomLeftRadius = "15px";
      cityInput.style.borderBottomRightRadius = "15px";
      cityInput.style.borderBottomWidth = "2px";
    }, 500);
  }

  townInput.onfocus = () => {
    selectTownWrapper.style.display = 'block';
    selectTownWrapper.innerHTML = "";
    townInput.style.borderBottomLeftRadius = "0px";
    townInput.style.borderBottomRightRadius = "0px";
    townInput.style.borderBottomWidth = "0px";

    towns.forEach(town => {
      const newSpan = document.createElement('span');
      newSpan.classList.add('each-town-select');
      newSpan.innerHTML = town;
      selectTownWrapper.appendChild(newSpan);
    });
  }
  townInput.oninput = () => {
    selectTownWrapper.innerHTML = "";
    towns.forEach(town => {
      if (town.toLocaleLowerCase().indexOf(townInput.value.toLocaleLowerCase()) !== -1 || !townInput.value.length) {
        const newSpan = document.createElement('span');
        newSpan.classList.add('each-town-select');
        newSpan.innerHTML = town;
        selectTownWrapper.appendChild(newSpan);

        while (townInput.value.length && newSpan.previousElementSibling && town.toLocaleLowerCase().indexOf(townInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(townInput.value.toLocaleLowerCase()))
          selectTownWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
      }
    });
  }
  townInput.onblur = () => {
    setTimeout(() => {
      selectTownWrapper.style.display = 'none';
      townInput.style.borderBottomLeftRadius = "15px";
      townInput.style.borderBottomRightRadius = "15px";
      townInput.style.borderBottomWidth = "2px";
    }, 500);
  }

  const newProductForm = document.querySelector('.new-product-form');

  newProductForm.onsubmit = event => {
    if (!cities.includes(cityInput.value) || !towns.includes(townInput.value)) {
      event.preventDefault();
      return alert("Lütfen listede olan bir şehir ve ilçeyi seçin!");
    }
  }
};
