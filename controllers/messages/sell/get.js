const mongoose = require('mongoose');

const Message = require('../../../models/message/Message');
const Product = require('../../../models/product/Product');
const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    Message.findOne({
      "buyer": req.query.user,
      "product": req.query.id
    }, (err, message) => {
      if (err) return res.redirect('/');
      let modifiedNum = 0;

      const newMessages = message.messages.map(eachMessage => {
        if (eachMessage.sendedBy == 'buyer' && !eachMessage.read) {
          eachMessage.read = true;
          modifiedNum++;
        }
        
        return eachMessage;
      });

      Message.findOneAndUpdate({
        "buyer": req.query.user,
        "product": req.query.id
      }, {$set: {
        "messages": newMessages
      }}, {new: true}, (err, message) => {
        if (err) return res.redirect('/');

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$inc: {
          "notReadMessage": parseInt(-1 * modifiedNum)
        }}, {new: true}, (err, newUser) => {
          if (err) return res.redirect('/messages/dashboard');
          req.session.user = newUser;

          Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
            if (err) return res.redirect('/');

            User.findById(mongoose.Types.ObjectId(req.query.user), (err, buyer) => {
              if (err) return res.redirect("/messages/dashboard");

              return res.render("messages/sell", {
                page: "messages/sell",
                title: product.name,
                includes: {
                  external: ["css", "js", "fontawesome", "socket.io"]
                },
                product,
                message,
                buyer,
                user: req.session.user
              });
            });
          });
        });
      })
    })
  } else {
    return res.redirect('/messages/dashboard');
  }
};
