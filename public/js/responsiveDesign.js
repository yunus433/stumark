function responsiveDesign(item) {
  let ratio = window.innerWidth / 1920;
  
  const spans = item.getElementsByTagName('span');
  const strongs = item.getElementsByTagName('strong');
  const inputs = item.getElementsByTagName('input');
  const atags = item.getElementsByTagName('a');
  const buttons = item.getElementsByTagName('button');
  const textareas = item.getElementsByTagName('textarea');
  const selects = item.getElementsByTagName('select');
  const itags = item.getElementsByTagName('i');
  const lis = item.getElementsByTagName('li');

  if (ratio < 0.45) ratio = 0.45;

  for (let i = 0; i < spans.length; i++) {
    const fontSize = window.getComputedStyle(spans[i], null).getPropertyValue('font-size');
    const lineHeight = window.getComputedStyle(spans[i], null).getPropertyValue('line-height');
    if (fontSize)
      spans[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
    if (lineHeight)
      spans[i].style.lineHeight = (parseFloat(lineHeight) * ratio) + "px";
  };

  for (let i = 0; i < strongs.length; i++) {
    const fontSize = window.getComputedStyle(strongs[i], null).getPropertyValue('font-size');
    const lineHeight = window.getComputedStyle(strongs[i], null).getPropertyValue('line-height');
    if (fontSize)
      strongs[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
    if (lineHeight)
      strongs[i].style.lineHeight = (parseFloat(lineHeight) * ratio) + "px";
  };

  for (let i = 0; i < inputs.length; i++) {
    const fontSize = window.getComputedStyle(inputs[i], null).getPropertyValue('font-size');
    if (fontSize)
      inputs[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
  };

  for (let i = 0; i < atags.length; i++) {
    const fontSize = window.getComputedStyle(atags[i], null).getPropertyValue('font-size');
    if (fontSize)
      atags[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
  };

  for (let i = 0; i < buttons.length; i++) {
    const fontSize = window.getComputedStyle(buttons[i], null).getPropertyValue('font-size');
    if (fontSize)
      buttons[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
  };

  for (let i = 0; i < textareas.length; i++) {
    const fontSize = window.getComputedStyle(textareas[i], null).getPropertyValue('font-size');
    if (fontSize)
      textareas[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
  };

  for (let i = 0; i < selects.length; i++) {
    const fontSize = window.getComputedStyle(selects[i], null).getPropertyValue('font-size');
    if (fontSize)
      selects[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
  };

  for (let i = 0; i < itags.length; i++) {
    const fontSize = window.getComputedStyle(itags[i], null).getPropertyValue('font-size');
    if (fontSize)
      itags[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
  };

  for (let i = 0; i < lis.length; i++) {
    const fontSize = window.getComputedStyle(lis[i], null).getPropertyValue('font-size');
    if (fontSize)
      lis[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
  };
};
