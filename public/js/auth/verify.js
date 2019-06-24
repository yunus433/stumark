window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);
};
