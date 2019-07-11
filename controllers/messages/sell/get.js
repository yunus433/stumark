const mongoose = require('mongoose');
const _ = require('lodash');

const User  =require('../../../models/user/User');
const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findOne({
      "_id": mongoose.Types.ObjectId(req.query.id),
      "owner": req.session.user._id.toString()
    }, (err, product) => {
      if (err) return res.redirect("/messages/dashboard");

      const messages = product.messages.filter(message => {return message.buyerId == req.query.user});
      

      Product.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(req.query.id),
        "owner": req.session.user._id.toString()
      }, {$set: {
        "messages": product.messages.map(message => {
          if (message.buyerId == req.query.user) {
            message.read = true;
            return message;
          } else {
            return message;
          }
        })
      }}, err => {
        if (err) return res.redirect("/messages/dashboard");

        User.findById(mongoose.Types.ObjectId(req.query.user), (err, buyer) => {
          if (err) return res.redirect("/messages/dashboard");

          return res.render("messages/sell", {
            page: "messages/sell",
            title: "Nachrichten",
            includes: {
              external: ["js" ,"css", "fontawesome"]
            },
            product,
            messages,
            user: req.session.user,
            buyer
          });
        });
      });
    });
  } else {
    res.redirect("/messages");
  }
};
