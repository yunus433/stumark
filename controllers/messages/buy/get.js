const mongoose = require('mongoose');

const Product = require("../../../models/product/Product");
const User = require('../../../models/user/User');

 module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findById(req.query.id, (err, product) => {
      if (err) return res.redirect("/messages/dashboard");

      if (product.owner == req.session.user._id.toString()) return res.redirect('/sell/details/?id=' + req.query.id);
      
      const messages = product.messages.filter(message => {
        if (message.buyerId == req.session.user._id)
          return message;
      });
      product.messages = {};

      User.findById(mongoose.Types.ObjectId(product.owner), (err, owner) => {
        if (err) return res.redirect("/messages/dashboard");

        res.render("messages/buy", {
          page: "messages/buy",
          title: product.name,
          includes: {
            external: ["css", "js", "fontawesome"]
          },
          product,
          messages,
          owner,
          user: req.session.user
        });
      });
    });
  } else {
    res.redirect("/messages/dashboard");
  }
};