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

  let clicked = false;
  let selectedCity = null;
  const selectCityButton = document.querySelector('.select-school-button');
  const selectCityInput = document.querySelector('.select-school-input');
  const schoolsWrapper = document.querySelector('.schools-inner-wrapper');
  const schoolsOuterWrapper = document.querySelector('.schools-wrapper');
  
  document.addEventListener('click', event => {
    if ((event.target.classList.contains('select-school-button') && event.target.classList.contains('clicked') && !event.target.classList.contains('select-school-input')) || (event.target.parentNode.classList.contains('select-school-button') && event.target.parentNode.classList.contains('clicked') && !event.target.classList.contains('select-school-input'))) {
      schoolsWrapper.classList.remove('open-schools-animation-class');
      schoolsWrapper.classList.add('close-schools-animation-class');
      clicked = false;

      setTimeout(() => {
        selectCityButton.classList.remove('clicked');
        schoolsOuterWrapper.style.display = 'none';
      }, 300);
    } else if (event.target.classList.contains('select-school-button') || event.target.parentNode.classList.contains('select-school-button')) {
      document.querySelector('.form-main-wrapper').scrollTop = 0;

      setTimeout(() => {
        selectCityButton.classList.add('clicked');
        selectCityInput.focus();
        clicked = true;
        schoolsOuterWrapper.style.display = 'flex';
        schoolsWrapper.classList.remove('close-schools-animation-class');
        schoolsWrapper.classList.add('open-schools-animation-class');
      }, 100);
    } else if (clicked) {
      schoolsWrapper.classList.remove('open-schools-animation-class');
      schoolsWrapper.classList.add('close-schools-animation-class');

      setTimeout(() => {
        selectCityButton.classList.remove('clicked');
        schoolsOuterWrapper.style.display = 'none';
      }, 300);
    }

    if (event.target.className == 'select-each-school') {
      selectCityButton.childNodes[1].value = event.target.id;
      selectCityButton.childNodes[2].value = event.target.innerHTML;
      selectedCity = event.target.innerHTML;
    }
  });

  selectCityInput.oninput = (event) => {
    if (!clicked) {
      selectCityButton.classList.add('clicked');
      selectCityInput.focus();
      clicked = true;
      schoolsOuterWrapper.style.display = 'flex';
      schoolsWrapper.classList.remove('close-schools-animation-class');
      schoolsWrapper.classList.add('open-schools-animation-class');
    }
    
    schoolsWrapper.innerHTML = "";
    schools.forEach(school => {
      if (school.name.toLocaleLowerCase().indexOf(selectCityInput.value.toLocaleLowerCase()) !== -1) {
        const newSpan = document.createElement('span');
        newSpan.classList.add('select-each-school');
        newSpan.innerHTML = school.name;
        schoolsWrapper.appendChild(newSpan);

        while (newSpan.previousElementSibling && school.name.toLocaleLowerCase().indexOf(selectCityInput.value.toLocaleLowerCase()) < newSpan.previousElementSibling.innerHTML.toLocaleLowerCase().indexOf(selectCityInput.value.toLocaleLowerCase()))
          schoolsWrapper.insertBefore(newSpan, newSpan.previousElementSibling);

        if (school.name.toLocaleLowerCase() == selectCityInput.value.toLocaleLowerCase())
          selectCityButton.childNodes[1].value = school._id.toString();
      }
    });

  };

  document.querySelector('.form-main-wrapper').onscroll = (event) => {
    schoolsWrapper.classList.remove('open-schools-animation-class');
    schoolsWrapper.classList.add('close-schools-animation-class');
    clicked = false;
  
    selectCityButton.classList.remove('clicked');
    schoolsWrapper.style.display = 'none';
  };
}
