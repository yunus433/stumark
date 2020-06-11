const async = require('async');
const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

const subcategories = {
  all: { all: "Tümü" },
  book: { all: "Tümü", personal: "Kişisel Gelişim", novel: "Edebi Roman", history: "Tarih", foreign: "Yabancı Dil", poetry: "Şiir Kitabı", recipe: "Yemek Kitabı", psychology: "Psikoloji", business: "İş, Ekonomi, Hukuk" },
  stationery: { all: "Tümü" },
  electronic: { all: "Tümü" },
  hobby: { all: "Tümü" },
  fashion: { all: "Tümü" },
  lesson: { all: "Tümü" },
  exchange: { all: "Tümü" },
  fun: { all: "Tümü" },
  donation: { all: "Tümü" },
  rented: { all: "Tümü" },
  other: { all: "Tümü" }
}

module.exports = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.redirect('/');

    async.times(
      products.length,
      (time, next) => {
        Product.findByIdAndUpdate(mongoose.Types.ObjectId(products[time]._id), {$set: {
          subcategory: ['all', 'book', 'stationery', 'electronic', 'hobby', 'fashion', 'lesson', 'exchange', 'fun', 'donation', 'rented', 'other'].includes(products[time].category) ? Object.values(subcategories[products[time].category])[0] : "Tümü",
          city: "-",
          town: "-"
        }}, {}, err => next(err, true))
      },
      err => {
        if (err) return res.redirect('/');

        return res.redirect('/admin');
      }
    );
  });
};
