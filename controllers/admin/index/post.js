const async = require('async');
const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.redirect('/');

    async.times(
      products.length,
      (time, next) => {
        Product.findByIdAndUpdate(mongoose.Types.ObjectId(products[time]._id), {$set: {
          price_number: products[time].price == "ücretsiz" ? 0 : products[time].price == "SATILDI" ? -1 :  parseInt(products[time].price.split('₺').join(''))
        }}, {}, err => next(err, true))
      },
      err => {
        if (err) return res.redirect('/');

        return res.redirect('/admin');
      }
    );
  });
};
