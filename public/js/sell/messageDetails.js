function scrollToBottom (querySelector) {
  const element = document.querySelector(querySelector);
  element.scrollTop = element.scrollHeight;
}

window.onload = () => {
  scrollToBottom(".--s_messages_wrapper");
  const form = document.querySelector('.--s_messages_send_wrapper');
  const content = document.querySelector('.--s_messages_send');

  document.addEventListener('click', (event) => {
    if (event.target.className == '--s_send_button' || event.target.parentNode.className == '--s_send_button')
      if (content.value != "")
        form.submit();
  });
};
