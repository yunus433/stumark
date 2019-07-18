const mongoose = require('mongoose');

const Product = require("../../../models/product/Product");
const User = require('../../../models/user/User');

 module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findById(req.query.id, (err, product) => {
      if (err) return res.redirect("/messages/dashboard");

      if (product.owner == req.session.user._id.toString()) 
        return res.redirect('/sell/details/?id=' + req.query.id);
      
      let notReadNumber = 0;

      product.messages = product.messages.map(message => {
        if (message.buyerId == req.session.user._id && message.sendedBy == 'owner' && !message.read) {
          notReadNumber++;
          message.read = true;
          return message;
        } else {
          return message;
        }
      })

      const messages = product.messages.filter(message => { return message.buyerId = req.session.user._id });

      Product.findByIdAndUpdate(req.query.id, {$set: {
        messages: product.messages
      }}, err => {
        if (err) return res.redirect("/messages/dashboard");
        product.messages = {};

        User.findById(mongoose.Types.ObjectId(product.owner), (err, owner) => {
          if (err) return res.redirect("/messages/dashboard");
  
          User.findByIdAndUpdate(req.session.user._id, {$inc: {
            "notReadMessage": -1 * notReadNumber
          }}, {new: true}, (err, newUser) => {
            if (err) return res.redirect('/messages/dashboard');
            req.session.user = newUser;

            res.render("messages/buy", {
              page: "messages/buy",
              title: product.name,
              includes: {
                external: ["css", "js", "fontawesome", "socket.io"]
              },
              product,
              messages,
              owner,
              user: req.session.user
            });
          });
        });
      });
    });
  } else {
    res.redirect("/messages/dashboard");
  }
};
