const async = require('async');
const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.redirect('/');

    async.times(
      products.length,
      (time, next) => {
        Product.findByIdAndUpdate(mongoose.Types.ObjectId(products[time]._id), {$set: {
          city: products[time].city_name ? engName(products[time].city_name) : "-"
        }}, {}, err => next(err, true))
      },
      err => {
        if (err) return res.redirect('/');

        return res.redirect('/admin');
      }
    );
  });
};
