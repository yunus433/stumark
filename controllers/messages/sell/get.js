const mongoose = require('mongoose');
const _ = require('lodash');

const User  =require('../../../models/user/User');
const Product = require('../../../models/product/Product');
const Message = require('../../../models/message/Message');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    Message.updateMany({
      "productId": req.query.id,
      "buyerId": req.query.user,
      "sendedBy": "buyer"
    }, {$set: {
      read: true
    }}, {new: true}, (err, response) => {
      if (err) return res.redirect('/');

      Message.find({
        "productId": req.query.id,
        "buyerId": req.query.user
      }, (err, messages) => {
        if (err) return res.redirect('/');

        User.findById(mongoose.Types.ObjectId(req.query.user), (err, buyer) => {
          if (err) return res.redirect("/messages/dashboard");
  
          User.findByIdAndUpdate(req.session.user._id, {$inc: {
            "notReadMessage": -1 * response.nModified
          }}, {new: true}, (err, newUser) => {
            if (err) return res.redirect('/messages/dashboard');
            req.session.user = newUser;

            Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
              if (err) return res.redirect('/');

              return res.render("messages/sell", {
                page: "messages/sell",
                title: product.name,
                includes: {
                  external: ["css", "js", "fontawesome", "socket.io"]
                },
                product,
                messages,
                buyer,
                user: req.session.user
              });
            });
          });
        });
      });
    });
  } else {
    return res.redirect("/messages/dashboard");
  }
};
