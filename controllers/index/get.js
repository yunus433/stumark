const async = require('async');

const Product = require('../../models/product/Product');

module.exports = (req, res) => {
  Product.getLatest({
    category: "all",
    docsToSkip: 0,
    limit: 50
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
