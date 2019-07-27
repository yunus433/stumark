const mongoose = require('mongoose');

const Message = require('../../../models/message/Message');
const Product = require('../../../models/product/Product');
const User = require('../../../models/user/User');

 module.exports = (req, res) => {
  if (req.query && req.query.id) {
    Message.updateMany({
      "productId": req.query.id,
      "buyerId": req.session.user._id.toString(),
      "sendedBy": "owner"
    }, {$set: {
      read: true
    }}, {new: true}, (err, response) => {
      if (err) return res.redirect('/');

      Message.find({
        "productId": req.query.id,
        "buyerId": req.session.user._id.toString()
      }, (err, messages) => {
        if (err) return res.redirect('/');
  
          User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$inc: {
            "notReadMessage": parseInt(-1 * response.nModified)
          }}, {new: true}, (err, newUser) => {
            if (err) return res.redirect('/messages/dashboard');
            req.session.user = newUser;
  
            Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
              if (err) return res.redirect('/');

              User.findById(mongoose.Types.ObjectId(product.owner), (err, owner) => {
                if (err) return res.redirect("/messages/dashboard");

                return res.render("messages/buy", {
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
    });
  } else {
    return res.redirect('/messages/dashboard');
  }
};
