window.onload = () => {
  const schools = JSON.parse(document.getElementById('schools-json').value);
  const user = JSON.parse(document.getElementById('user-json').value);
  const schoolSearchInput = document.getElementById('school-search-input');
  const schoolsWrapper = document.querySelector('.schools-wrapper');

  schoolSearchInput.oninput = () => {
    schoolsWrapper.innerHTML = "";

    schools.forEach(school => {
      if (school.name.toLocaleLowerCase().indexOf(schoolSearchInput.value.toLocaleLowerCase()) !== -1 || !schoolSearchInput.value.length) {
        const eachSchoolWrapper = document.createElement('label');
        eachSchoolWrapper.classList.add('each-school');
        const newInput = document.createElement('input');
        newInput.type = "radio";
        newInput.name = "school";
        newInput.required = true;
        newInput.value = school._id.toString();
        if (user.school == school._id.toString())
          newInput.checked = true;
        const newSpan = document.createElement('span');
        newSpan.innerHTML = school.name;

        eachSchoolWrapper.appendChild(newInput);
        eachSchoolWrapper.appendChild(newSpan);
        schoolsWrapper.appendChild(eachSchoolWrapper);

        while (schoolSearchInput.value.length && eachSchoolWrapper.previousElementSibling && school.name.toLocaleLowerCase().indexOf(schoolSearchInput.value.toLocaleLowerCase()) < eachSchoolWrapper.previousElementSibling.childNodes[1].innerHTML.toLocaleLowerCase().indexOf(schoolSearchInput.value.toLocaleLowerCase()))
          selectTownWrapper.insertBefore(eachSchoolWrapper, eachSchoolWrapper.previousElementSibling);
      }
    });
  }
}
