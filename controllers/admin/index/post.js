const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.redirect('/');

    products.forEach(product => {
      User.findById(mongoose.Types.ObjectId(product.owner), (err, user) => {
        Product.findByIdAndUpdate(product._id, {$set: {
          "university": user.university
        }}, (err, result) => {
          if (err || !result) return res.redirect('/');
        });
      });
    });

    return res.redirect('/admin');
  });
};
