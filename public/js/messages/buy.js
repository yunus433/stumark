function createNewMessage(message, buyer, seller) {
  const messagesWrapper = document.querySelector('.messages-content');

  const newMessageDiv = document.createElement('div');
  newMessageDiv.classList.add('each-message');

  if (message.sendedBy == 'buyer') {
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
    messageSender.innerHTML = message.buyerName;
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
    messageImage.src = buyer.profilePhoto;
    messageRightSide.appendChild(messageImage);
    newMessageDiv.appendChild(messageRightSide);
  } else {
    const messageRightSide = document.createElement('div');
    messageRightSide.classList.add('message-right-side');

    const messageImage = document.createElement('img');
    messageImage.classList.add('message-sender-profile');
    messageImage.src = seller.profilePhoto;
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
    messageSender.innerHTML = seller.name;
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
  }

  const userMenu = document.querySelector('.user-menu');
  const userMenuResponsive = document.querySelector('.user-menu-responsive');
  const contentBarResponsive = document.querySelector('.content-bar-responsive');

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

  const messagesBlock = document.querySelector('.messages-left-side');
  messagesBlock.scrollTop = messagesBlock.scrollHeight;

  document.addEventListener('click', (event) => {
    if (event.target.className == 'product-menu-image') {
      event.target.parentNode.parentNode.childNodes[0].childNodes[0].src = event.target.src;
      event.target.parentNode.querySelector('.selected-menu-image').classList.remove('selected-menu-image');
      event.target.classList.add('selected-menu-image');
    }

    if (event.target.classList.contains('fa-times')) {
      document.querySelector('.messages-right-side').style.display = 'none';
      document.querySelector('.reopen-right-side-button').style.display = 'flex';
    }

    if (event.target.className == 'reopen-right-side-button' || event.target.parentNode.className == 'reopen-right-side-button') {
      document.querySelector('.messages-right-side').style.display = 'flex';
      document.querySelector('.reopen-right-side-button').style.display = 'none';
    }
  });

  const productObject = JSON.parse(document.getElementById('product-object').value);
  const userObject = JSON.parse(document.getElementById('user-object').value);
  const sellerObject = JSON.parse(document.getElementById('seller-object').value);
  const form = document.querySelector('.message-send-wrapper');
  const newMessageInput = document.querySelector('.new-message-input');

  const socket = io();

  socket.on('connect', function() {
    socket.emit('join', {
      room: productObject._id
    });

    form.onsubmit = (event) => {
      event.preventDefault();
      
      if (newMessageInput.value) {
        const newMessageObject = {
          content: newMessageInput.value,
          buyerId: userObject._id,
          buyerName: userObject.name,
          productProfile: productObject.productPhotoArray[0],
          productName: productObject.name,
          productId: productObject._id,
          sendedBy: "buyer",
          read: false,
          createdAt: ""
        };

        socket.emit('newMessageSend', {
          message: newMessageObject
        }, (err, message) => {
          if (err) return alert('Something went wrong, please try again');

          createNewMessage(message, userObject, sellerObject);
          messagesBlock.scrollTop = messagesBlock.scrollHeight;
          newMessageInput.value = "";
        });
      }
    };

    socket.on('newMessage', params => {
      if (params.message.sendedBy == "owner" && params.message.buyerId == userObject._id) {
        createNewMessage(params.message, userObject, sellerObject);
        messagesBlock.scrollTop = messagesBlock.scrollHeight;
        newMessageInput.value = "";
      }
    });
  });
};
