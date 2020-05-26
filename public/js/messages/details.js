function createNewMessage(message, buyer, owner, user) {
  const messagesWrapper = document.querySelector('.messages-content');

  const newMessageDiv = document.createElement('div');

  if (message.sendedBy == user._id.toString()) {
    newMessageDiv.classList.add('each-message-user');

    const messageLeftSide = document.createElement('div');
    messageLeftSide.classList.add('message-left-side-user');

    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header-user');

    const messageTime = document.createElement('span');
    messageTime.classList.add('message-time');
    messageTime.innerHTML = message.time + " / " + message.day;
    messageHeader.appendChild(messageTime);

    const messageSender = document.createElement('span');
    messageSender.classList.add('message-sender');
    messageSender.innerHTML = user.name;
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
    messageImage.src = user.profilePhoto;
    messageRightSide.appendChild(messageImage);
    newMessageDiv.appendChild(messageRightSide);
  } else {
    newMessageDiv.classList.add('each-message');

    const messageRightSide = document.createElement('div');
    messageRightSide.classList.add('message-right-side');

    const messageImage = document.createElement('img');
    messageImage.classList.add('message-sender-profile');
    messageImage.src = (buyer._id.toString() != message.sendedBy ? buyer.profilePhoto : owner.profilePhoto);
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
    messageSender.innerHTML = (buyer._id.toString() != message.sendedBy ? buyer.name : owner.name);
    messageHeader.appendChild(messageSender);
    messageLeftSide.appendChild(messageHeader);

    const messageContent = document.createElement('span');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = message.content;
    messageLeftSide.appendChild(messageContent);

    newMessageDiv.appendChild(messageLeftSide);
  }

  messagesWrapper.appendChild(newMessageDiv);
}

window.onload = () => {
  addEventListener(document);

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

  const userObject = JSON.parse(document.getElementById('user-object').value);
  const chatObject = JSON.parse(document.getElementById('chat-object').value);
  const form = document.querySelector('.message-send-wrapper');
  const newMessageInput = document.querySelector('.new-message-input');

  const socket = io();

  socket.on('connect', function() {
    socket.emit('join', {
      room: chatObject._id.toString()
    });

    form.onsubmit = (event) => {
      event.preventDefault();
      newMessageInput.focus();
      if (newMessageInput.value) {
        const newMessageObject = {
          content: newMessageInput.value,
          sendedBy: userObject._id.toString()
        };

        socket.emit('newMessageSend', {
          message: newMessageObject,
          to: chatObject._id.toString()
        }, (err, message) => {
          if (err) return alert('Bir hata oluştu, lütfen tekrar deneyin');

          createNewMessage(message, chatObject.buyer, chatObject.owner, userObject);
          messagesBlock.scrollTop = messagesBlock.scrollHeight;
          newMessageInput.value = "";
        });
      }
    };

    socket.on('newMessage', params => {
      if (params.message.sendedBy != userObject._id.toString()) {
        createNewMessage(params.message, chatObject.buyer, chatObject.owner, userObject);
        messagesBlock.scrollTop = messagesBlock.scrollHeight;
        newMessageInput.value = "";
      }
    });
  });
};
