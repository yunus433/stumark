const _ = require('lodash');

const Product = require("../../../models/product/Product");

 module.exports = (req, res, next) => {
  Product.find({"messages.buyerId": req.session.user._id}, (err, buyProducts) => {
    if (err) return res.redirect('/');

    Product.find({"owner": req.session.user._id}, (err, sellProducts) => {
      if (err) return res.redirect('/');

      return res.render('messages/dashboard', {
        page: "messages/dashboard",
        title: "Nachrichten",
        includes: {
          external: ["js" ,"css", "fontawesome"]
        },
        buyProducts,
        sellProducts,
        user: req.session.user
      });
    });
  });
};
