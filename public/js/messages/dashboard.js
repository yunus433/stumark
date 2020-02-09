window.onload = () => {
  addEventListener(document);

  const noBuyProductText = document.querySelector('.no-buy-product-text');
  const noSellProductText = document.querySelector('.no-sell-product-text');
  
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-message-button') || event.target.parentNode.classList.contains('buy-message-button')) {
      document.querySelector('.chose-buy-product-wrapper').style.display = 'grid';
      document.querySelector('.chose-sell-product-wrapper').style.display = 'none';
      if (noBuyProductText)
        noBuyProductText.style.display = 'flex';
      if (noSellProductText)
        noSellProductText.style.display = 'none';
    }

    if (event.target.classList.contains('sell-message-button') || event.target.parentNode.classList.contains('sell-message-button')) {
      document.querySelector('.chose-sell-product-wrapper').style.display = 'grid';
      document.querySelector('.chose-buy-product-wrapper').style.display = 'none';
      if (noSellProductText)
        noSellProductText.style.display = 'flex';
      if (noBuyProductText)
        noBuyProductText.style.display = 'none';
    }
  });
}
