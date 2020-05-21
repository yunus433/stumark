const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');


module.exports = (req, res, next) => {
  Product
    .find({"owner": req.session.user._id.toString()}, 
    (err, products) => {
      if (err) return res.redirect('/');
    
      return res.render('sell/dashboard', {
        page: 'sell/dashboard',
        title: 'Satılık Ürünlerin',
        includes: {
          external: ['css', 'js', 'fontawesome']
        },
        products,
        user: req.session.user
      });
    });
}
