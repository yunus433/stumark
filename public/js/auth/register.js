window.onload = () => {
  const form = document.querySelector('.form-wrapper');
  const error = document.querySelector('.each-error-line');
  form.onsubmit = (event) => {
    event.preventDefault();
    

    if (document.getElementById('password-input-one').value.length < 6 || document.getElementById('password-input-two').value.length < 6) {
      error.innerHTML = 'Şifreniz en az 6 karakterli olmalı.';
    }
    else if (document.getElementById('password-input-one').value != document.getElementById('password-input-two').value) {
      error.innerHTML = 'Lütfen şifrenizi tekrar girin.';
    }
    else {
      form.submit();
    }
  }

  const schools = JSON.parse(document.getElementById('schools-json').value);

  const selectCityButton = document.querySelector('.select-school-button');
  const selectCityInput = document.querySelector('.select-school-input');
  const schoolNoneInput = document.getElementById('school-none-input');
  const schoolsWrapper = document.querySelector('.schools-inner-wrapper');
  const schoolsOuterWrapper = document.querySelector('.schools-wrapper');
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('select-each-school') || event.target.parentNode.classList.contains('select-each-school')) {
      console.log("here");
      schoolNoneInput.value = event.target.id;
      selectCityInput.value = event.target.innerHTML;
    }
  });

  selectCityInput.onfocus = () => {
    selectCityButton.style.borderBottomLeftRadius = "0px";
    selectCityButton.style.borderBottomRightRadius = "0px";
    schoolsOuterWrapper.style.display = "flex";
  }

  selectCityInput.onblur = () => {
    setTimeout(() => {
      selectCityButton.style.borderBottomLeftRadius = "15px";
      selectCityButton.style.borderBottomRightRadius = "15px";
      schoolsOuterWrapper.style.display = "none";
    }, 200);
  }

  selectCityInput.oninput = () => {
    schoolsWrapper.innerHTML = "";
    schools.forEach(school => {
      if (school.name.toLocaleLowerCase().indexOf(selectCityInput.value.toLocaleLowerCase()) !== -1 || !selectCityInput.value.length) {
        const newSpan = document.createElement('span');
        newSpan.classList.add('select-each-school');
        newSpan.innerHTML = school.name;
        newSpan.classList.add('select-each-school');
        newSpan.id = school._id.toString();
        schoolsWrapper.appendChild(newSpan);

        while (selectCityInput.value.length && newSpan.previousElementSibling && school.name.toLocaleLowerCase().indexOf(selectCityInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectCityInput.value.toLocaleLowerCase()))
          schoolsWrapper.insertBefore(newSpan, newSpan.previousElementSibling);

        if (school.name.toLocaleLowerCase() == selectCityInput.value.toLocaleLowerCase())
          selectCityButton.childNodes[1].value = school._id.toString();
      }
    });
  };
}
