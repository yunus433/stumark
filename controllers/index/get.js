const async = require('async');

const Product = require('../../models/product/Product');

module.exports = (req, res) => {
  Product.getLatest({
    category: "book",
    subcategory: "all",
    price: "0-5₺",
    docsToSkip: 0,
    limit: 100
  }, (err, latestProducts) => {
    if (err) return console.log(err);

    async.times(
      latestProducts.length,
      (time, next) => {
        Product.findById(latestProducts[time], (err, returnedProduct) => {
          next(err, returnedProduct);
        });
      },
      (err, products) => {
        if (err) return console.log(err);

        return res.render('index/index', {
          page: 'index/index',
          title: 'Ana Sayfa',
          includes: {
            external: ['js', 'css', 'fontawesome']
          },
          products,
          user: req.session.user || undefined
        });
      }
    );
  });
}
