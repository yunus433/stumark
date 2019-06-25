const mongoose = require('mongoose');
const _ = require('lodash');

const Product = require("../../../models/product/Product");
const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findOne({
      "_id": mongoose.Types.ObjectId(req.query.id),
      "owner": req.session.user._id.toString()
    }, (err, product) => {
      if (err) return res.redirect("/sell");

      const messages = product.messages.filter(message => {return message.senderId == req.query.user});

      User.findById(mongoose.Types.ObjectId(req.query.user), (err, user) => {
        if (err) return res.redirect('/sell');

        return res.render("sell/messages", {
          page: "sell/messages",
          title: "Your messages",
          includes: {
            external: ["js" ,"css", "fontawesome"]
          },
          product,
          messages,
          user: req.session.user,
          buyer: user
        });
      });
    });
  } else {
    res.redirect("/sell");
  }
};
