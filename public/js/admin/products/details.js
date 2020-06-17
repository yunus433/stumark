const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
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
  const product = JSON.parse(document.getElementById('product-json').value);
  const cities = JSON.parse(document.getElementById('cities-json').value);
  const categories = JSON.parse(document.getElementById('categories-json').value);
  const subcategories = JSON.parse(document.getElementById('subcategories-json').value);
  let towns = [];
  let category = product.category;

  const cityInput = document.getElementById('city-input');
  const townInput = document.getElementById('town-input');
  const categoryInput = document.getElementById('category-input');
  const categoryValueInput = document.getElementById('category-value-input');
  const subcategoryInput = document.getElementById('subcategory-input');

  const selectInputs = document.querySelectorAll('.select-input');

  selectInputs.forEach(selectInput => {
    const selectWrapper = selectInput.parentNode.parentNode.childNodes[1].childNodes[0];
    
    selectInput.onfocus = () => {
      selectWrapper.style.display = 'block';
      selectInput.style.borderBottomLeftRadius = "0px";
      selectInput.style.borderBottomRightRadius = "0px";
      selectInput.style.borderBottomWidth = "0px";

      selectWrapper.innerHTML = "";

      if (selectInput.id == "city-input") {
        cities.forEach(city => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = city;
          newSpan.id = "city-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && city.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      } else if (selectInput.id == "town-input") {
        towns.forEach(town => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = town;
          newSpan.id = "town-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && town.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      } else if (selectInput.id == "category-input") {
        Object.values(categories).forEach(category => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = category;
          newSpan.id = "category-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && category.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      } else {
        subcategories[category].forEach(subcategory => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = subcategory;
          newSpan.id = "subcategory-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && subcategory.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      }
    }
    selectInput.oninput = () => {
      selectWrapper.innerHTML = "";

      if (selectInput.id == "city-input") {
        cities.filter(city => engName(city).indexOf(engName(selectInput.value)) != -1 || !selectInput.value.length).forEach(city => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = city;
          newSpan.id = "city-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && city.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      } else if (selectInput.id == "town-input") {
        towns.filter(town => engName(town).indexOf(engName(selectInput.value)) != -1 || !selectInput.value.length).forEach(town => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = town;
          newSpan.id = "town-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && town.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      } else if (selectInput.id == "category-input") {
        Object.values(categories).filter(category => engName(category).indexOf(engName(selectInput.value)) != -1 || !selectInput.value.length).forEach(category => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = category;
          newSpan.id = "category-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && category.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      } else {
        subcategories[category].filter(subcategory => engName(subcategory).indexOf(engName(selectInput.value)) != -1 || !selectInput.value.length).forEach(subcategory => {
          const newSpan = document.createElement('span');
          newSpan.classList.add('each-text-select');
          newSpan.innerHTML = subcategory;
          newSpan.id = "subcategory-select";
          selectWrapper.appendChild(newSpan);
        
          while (selectInput.value.length && newSpan.previousElementSibling && subcategory.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectInput.value.toLocaleLowerCase()))
            selectWrapper.insertBefore(newSpan, newSpan.previousElementSibling);
        });
      }
    }
    selectInput.onblur = () => {
      setTimeout(() => {
        selectWrapper.style.display = 'none';
        selectInput.style.borderBottomLeftRadius = "15px";
        selectInput.style.borderBottomRightRadius = "15px";
        selectInput.style.borderBottomWidth = "2px";
      }, 500);
    }
  });

  document.addEventListener('click', event => {
    if (event.target.id == 'city-select') {
      cityInput.value = event.target.innerHTML;
      getTowns(event.target.innerHTML, return_towns => {
        towns = return_towns.split('+');
        townInput.value = return_towns.split('+')[0];
      });
    } else if (event.target.id == 'town-select') {
      townInput.value = event.target.innerHTML;
    } else if (event.target.id == 'category-select') {
      categoryInput.value = event.target.innerHTML;
      category = Object.keys(categories)[Object.values(categories).indexOf(event.target.innerHTML)];

      categoryValueInput.value = category;
      subcategoryInput.value = subcategories[category][0];
    } else if (event.target.id == 'subcategory-select') {
      subcategoryInput.value = event.target.innerHTML;
    }
  });
}
