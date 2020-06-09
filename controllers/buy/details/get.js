const async = require('async');
const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Chat = require('../../../models/chat/Chat');

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    try {
      Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
        if (err || !product) return res.redirect("/");
  
        Product.getLatest(
          {
            category: JSON.parse(JSON.stringify(product)).category,
            docsToSkip: 0,
            limit: 9,
            productId: product._id
          },
          (err, latestProducts) => {
            if (err) return res.redirect("/");
  
            async.times(
              latestProducts.length,
              (time, next) => {
                Product.findById(latestProducts[time], (err, returnedProduct) => {
                  next(err, returnedProduct);
                });
              },
              (err, similarProducts) => {
                if (err) return res.redirect("/");
  
                if (req.session.user) {
                  Chat.findOne({
                    "buyer": req.session.user._id.toString(),
                    "product": product._id.toString()
                  }, (err, chat) => {
                    if (err) return res.redirect('/');
  
                    if (chat) 
                      return res.redirect('/messages/details?id=' + chat._id.toString());
                      
                    res.render('buy/details', {
                      page: 'buy/details',
                      title: product.name,
                      includes: {
                        external: ["css", "js", "fontawesome"]
                      },
                      product,
                      similarProducts,
                      user: req.session.user
                    });
                  });
                } else {
                  res.render('buy/details', {
                    page: 'buy/details',
                    title: product.name,
                    includes: {
                      external: ["css", "js", "fontawesome"]
                    },
                    product,
                    similarProducts
                  });
                }
              }
            );
          }
        );
      });
    } catch (err) {
      return res.redirect('/');
    }
  } else {
    res.redirect("/buy");
  }
};
