window.onload = () => {
  document.addEventListener('click', event => {
    if (event.target.className == 'new-user-button' || event.target.parentNode.className == 'new-user-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'none';
      document.querySelector('.new-form-wrapper').style.display = 'flex';
    }

    if (event.target.className == 'back-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'flex';
      document.querySelector('.new-form-wrapper').style.display = 'none';
    }
  });

  const searchUserInput = document.getElementById('search-user-input');
  const users = JSON.parse(document.getElementById('users-json').value);
  const usersWrapper = document.querySelector('.users-wrapper');

  searchUserInput.oninput = () => {
    usersWrapper.innerHTML = "";

    users.forEach(user => {
      if (user.name.toLocaleLowerCase().indexOf(searchUserInput.value.toLocaleLowerCase()) !== -1 || !searchUserInput.value.length) {
        const eachUser = document.createElement('a');
        eachUser.classList.add('each-user');
        eachUser.href = "/admin/users/details?id=" + user._id.toString();

        const eachUserProfileWrapper = document.createElement('div');
        eachUserProfileWrapper.classList.add('each-user-profile-wrapper');
        const eachUserProfile = document.createElement('img');
        eachUserProfile.src = user.profilePhoto;
        eachUserProfile.classList.add('each-user-profile');
        eachUserProfileWrapper.appendChild(eachUserProfile);
        eachUser.appendChild(eachUserProfileWrapper);

        const eachUserEmail = document.createElement('span');
        eachUserEmail.classList.add('each-user-email');
        eachUserEmail.innerHTML = user.email;
        eachUser.appendChild(eachUserEmail);

        const eachUserName = document.createElement('span');
        eachUserName.classList.add('each-user-name');
        eachUserName.innerHTML = user.name;
        eachUser.appendChild(eachUserName);

        const eachUserSchool = document.createElement('span');
        eachUserSchool.classList.add('each-user-school');
        eachUserSchool.innerHTML = user.school || user.university;
        eachUser.appendChild(eachUserSchool);

        usersWrapper.appendChild(eachUser);

        while (searchUserInput.value.length && eachUser.previousElementSibling && user.name.toLocaleLowerCase().indexOf(searchUserInput.value.toLocaleLowerCase()) < eachUser.previousElementSibling.childNodes[2].innerHTML.toLocaleLowerCase().indexOf(searchUserInput.value.toLocaleLowerCase()))
          usersWrapper.insertBefore(eachUser, eachUser.previousElementSibling);
      }
    });
  }

  const userInput = document.querySelector('.user-input');
  userInput.onclick = () => {
    if (userInput.checked) {
      usersWrapper.innerHTML = "";
      users.forEach(user => {
        if (!user.school) {
          const eachUser = document.createElement('a');
          eachUser.classList.add('each-user');
          eachUser.href = "/admin/users/details?id=" + user._id.toString();
  
          const eachUserProfileWrapper = document.createElement('div');
          eachUserProfileWrapper.classList.add('each-user-profile-wrapper');
          const eachUserProfile = document.createElement('img');
          eachUserProfile.src = user.profilePhoto;
          eachUserProfile.classList.add('each-user-profile');
          eachUserProfileWrapper.appendChild(eachUserProfile);
          eachUser.appendChild(eachUserProfileWrapper);
  
          const eachUserEmail = document.createElement('span');
          eachUserEmail.classList.add('each-user-email');
          eachUserEmail.innerHTML = user.email;
          eachUser.appendChild(eachUserEmail);
  
          const eachUserName = document.createElement('span');
          eachUserName.classList.add('each-user-name');
          eachUserName.innerHTML = user.name;
          eachUser.appendChild(eachUserName);
  
          const eachUserSchool = document.createElement('span');
          eachUserSchool.classList.add('each-user-school');
          eachUserSchool.innerHTML = user.university;
          eachUser.appendChild(eachUserSchool);
  
          usersWrapper.appendChild(eachUser);
        }
      });
    } else {
      usersWrapper.innerHTML = "";
      users.forEach(user => {
        const eachUser = document.createElement('a');
        eachUser.classList.add('each-user');
        eachUser.href = "/admin/users/details?id=" + user._id.toString();
  
        const eachUserProfileWrapper = document.createElement('div');
        eachUserProfileWrapper.classList.add('each-user-profile-wrapper');
        const eachUserProfile = document.createElement('img');
        eachUserProfile.src = user.profilePhoto;
        eachUserProfile.classList.add('each-user-profile');
        eachUserProfileWrapper.appendChild(eachUserProfile);
        eachUser.appendChild(eachUserProfileWrapper);
  
        const eachUserEmail = document.createElement('span');
        eachUserEmail.classList.add('each-user-email');
        eachUserEmail.innerHTML = user.email;
        eachUser.appendChild(eachUserEmail);
  
        const eachUserName = document.createElement('span');
        eachUserName.classList.add('each-user-name');
        eachUserName.innerHTML = user.name;
        eachUser.appendChild(eachUserName);
  
        const eachUserSchool = document.createElement('span');
        eachUserSchool.classList.add('each-user-school');
        eachUserSchool.innerHTML = user.school || user.university;
        eachUser.appendChild(eachUserSchool);

        usersWrapper.appendChild(eachUser);
      });
    }
  }
}
