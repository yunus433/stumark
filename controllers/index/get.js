const async = require('async');

const Product = require('../../models/product/Product');
const Campaign = require('../../models/campaign/Campaign');

module.exports = (req, res) => {
  try {
    Product.getLatest({
      category: "book",
      subcategory: "Tümü",
      price: "0-5₺",
      docsToSkip: 0,
      limit: 100,
      sort_by: "price"
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
  
          Campaign.getLastOne((err, campaign) => {
            if (err) return console.log(err);

            return res.render('index/index', {
              page: 'index/index',
              title: 'Ana Sayfa',
              includes: {
                external: ['js', 'css', 'fontawesome']
              },
              products,
              user: req.session.user || undefined,
              campaign
            });
          });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.redirect('/auth/login');
  }
}
