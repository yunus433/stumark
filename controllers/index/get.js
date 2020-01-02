const async = require('async');
const fs = require('fs');

const Product = require('../../models/product/Product');

module.exports = (req, res) => {
  let data = fs.readFileSync(__dirname + '/tfdata.json');
  let dataArray = Object.values(JSON.parse(data));

  let numbers = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0
  };

  dataArray.forEach(user => {
    if (user.campaigns && user.campaigns.webrazzi) {
      numbers[user.campaigns.webrazzi.status.toString()]++;
    }
  });

  Object.values(numbers).forEach((number, i) => {
    console.log(`${i+1}: ${number}`);
  });

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
          title: 'Startseite',
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
