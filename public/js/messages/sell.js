function createNewMessage(message, buyer, seller) {
  const messagesWrapper = document.querySelector('.messages-content');

  const newMessageDiv = document.createElement('div');
  newMessageDiv.classList.add('each-message');

  if (message.sendedBy == 'owner') {
    newMessageDiv.classList.add('buyer');

    const messageLeftSide = document.createElement('div');
    messageLeftSide.classList.add('message-left-side-buyer');

    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header-buyer');

    const messageTime = document.createElement('span');
    messageTime.classList.add('message-time');
    messageTime.innerHTML = message.createdAt;
    messageHeader.appendChild(messageTime);

    const messageSender = document.createElement('span');
    messageSender.classList.add('message-sender');
    messageSender.innerHTML = seller.name;
    messageHeader.appendChild(messageSender);
    messageLeftSide.appendChild(messageHeader);

    const messageContent = document.createElement('span');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = message.content;
    messageLeftSide.appendChild(messageContent);

    newMessageDiv.appendChild(messageLeftSide);

    const messageRightSide = document.createElement('div');
    messageRightSide.classList.add('message-right-side');

    const messageImage = document.createElement('img');
    messageImage.classList.add('message-sender-profile');
    messageImage.src = seller.profilePhoto;
    messageRightSide.appendChild(messageImage);
    newMessageDiv.appendChild(messageRightSide);
  } else {
    const messageRightSide = document.createElement('div');
    messageRightSide.classList.add('message-right-side');

    const messageImage = document.createElement('img');
    messageImage.classList.add('message-sender-profile');
    messageImage.src = buyer.profilePhoto;
    messageRightSide.appendChild(messageImage);
    newMessageDiv.appendChild(messageRightSide);

    const messageLeftSide = document.createElement('div');
    messageLeftSide.classList.add('message-left-side');

    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');

    const messageTime = document.createElement('span');
    messageTime.classList.add('message-time');
    messageTime.innerHTML = message.createdAt;
    messageHeader.appendChild(messageTime);

    const messageSender = document.createElement('span');
    messageSender.classList.add('message-sender');
    messageSender.innerHTML = buyer.name;
    messageHeader.appendChild(messageSender);
    messageLeftSide.appendChild(messageHeader);

    const messageContent = document.createElement('span');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = message.content;
    messageLeftSide.appendChild(messageContent);

    newMessageDiv.appendChild(messageLeftSide);
  }

  messagesWrapper.appendChild(newMessageDiv);
  responsiveDesign(newMessageDiv);
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

  const messagesBlock = document.querySelector('.messages-content');
  messagesBlock.scrollTop = messagesBlock.scrollHeight;
  
  document.addEventListener('mouseover', (event) => {
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu' || event.target.className == 'user-menu-responsive' || event.target.parentNode.className == 'user-menu-responsive') {
      if (userMenu) userMenu.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'flex';
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
    } else if (event.target.className == 'change-category-button' || event.target.parentNode.className == 'change-category-button' || event.target.className == 'content-bar-responsive' || event.target.parentNode.className == 'content-bar-responsive') {
      if (contentBarResponsive) contentBarResponsive.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    } else {
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
      if (userMenu) userMenu.style.display = 'none';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    }
  });
  document.addEventListener('touchstart', (event) => {
    if (event.target.className == 'user-name-wrapper' || event.target.parentNode.className == 'user-name-wrapper' || event.target.className == 'user-menu' || event.target.parentNode.className == 'user-menu' || event.target.className == 'user-menu-responsive' || event.target.parentNode.className == 'user-menu-responsive') {
      if (userMenu) userMenu.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'flex';
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
    } else if (event.target.className == 'change-category-button' || event.target.parentNode.className == 'change-category-button' || event.target.className == 'content-bar-responsive' || event.target.parentNode.className == 'content-bar-responsive') {
      if (contentBarResponsive) contentBarResponsive.style.display = 'flex';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    } else {
      if (contentBarResponsive) contentBarResponsive.style.display = 'none';
      if (userMenu) userMenu.style.display = 'none';
      if (userMenuResponsive) userMenuResponsive.style.display = 'none';
    }
  });

  const productId = document.getElementById('product-id').value;
  const userObject = JSON.parse(document.getElementById('user-object').value);
  const sellerObject = JSON.parse(document.getElementById('seller-object').value);
  const form = document.querySelector('.message-send-wrapper');
  const newMessageInput = document.querySelector('.new-message-input');

  const socket = io();

  socket.on('connect', function() {
    socket.emit('join', {
      room: productId
    });

    form.onsubmit = (event) => {
      event.preventDefault();
      
      if (newMessageInput.value) {
        const newMessageObject = {
          content: newMessageInput.value,
          buyerId: userObject._id,
          buyerName: userObject.name,
          sendedBy: "owner",
          read: true,
          createdAt: ""
        };

        socket.emit('newMessageSend', {
          message: newMessageObject,
          id: productId
        }, err => {
          if (err) return alert('Something went wrong, please try again');
        });
      }
    };

    socket.on('newMessage', params => {
      createNewMessage(params.message, userObject, sellerObject);
      messagesBlock.scrollTop = messagesBlock.scrollHeight;
      newMessageInput.value = "";
    });
  });
};
