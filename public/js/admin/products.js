const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

const createProduct = (product, productsWrapper) => {
  const eachProduct = document.createElement('a');
  eachProduct.classList.add('each-product');
  eachProduct.href = "/admin/products/details?id=" + product._id.toString();

  const eachProductProfileWrapper = document.createElement('div');
  eachProductProfileWrapper.classList.add('product-image-wrapper');
  const eachProductProfile = document.createElement('img');
  eachProductProfile.src = product.productPhotoArray[0];
  eachProductProfile.classList.add('product-image');
  eachProductProfileWrapper.appendChild(eachProductProfile);
  eachProduct.appendChild(eachProductProfileWrapper);

  const eachProductName = document.createElement('span');
  eachProductName.classList.add('product-name');
  eachProductName.innerHTML = product.name;
  eachProduct.appendChild(eachProductName);

  productsWrapper.appendChild(eachProduct);
}

window.onload = () => {
  const products = JSON.parse(document.getElementById('products-json').value);
  const categories = JSON.parse(document.getElementById('categories-json').value);

  const productsWrapper = document.querySelector('.products-wrapper');

  const checkInput = document.querySelector('.check-product-input');
  checkInput.onclick = () => {
    productsWrapper.innerHTML = "";

    if (checkInput.checked) {
      products.filter(product => product.subcategory == "Tümü" && categories.includes(product.category)).filter((product, key) => key < 100).forEach(product => {
        createProduct(product, productsWrapper);
      });
    } else {
      products.filter((product, key) => key < 100).forEach(product => {
        createProduct(product, productsWrapper);
      });
    }
  }

  const searchInput = document.querySelector('.search-product-input');

  searchInput.oninput = () => {
    checkInput.checked = false;
    productsWrapper.innerHTML = "";

    products.filter(product => engName(product.name).indexOf(engName(searchInput.value)) != -1 || !searchInput.value.length).filter((product, key) => key <= 100).forEach(product => {
      createProduct(product, productsWrapper);
    });
  }
}
