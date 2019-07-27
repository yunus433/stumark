const mongoose = require('mongoose');
const _ = require('lodash');

const Product = require('../../../models/product/Product');
const Message = require('../../../models/message/Message');

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findOne({
      "_id": mongoose.Types.ObjectId(req.query.id),
      "owner": req.session.user._id.toString()
    }, (err, product) => {
      if (err) return res.redirect("/messages/dashboard");
      
      Message.find({
        "productId": req.query.id
      }, (err, messages) => {
        if (err) return res.redirect('/');

        if (messages && messages.length > 0)
          messages = Object.values(_.groupBy(messages, message => { return message.buyerId }));
        else 
          messages = [];
   
        return res.render("messages/sellDashboard", {
          page: "messages/sellDashboard",
          title: "Nachrichten",
          includes: {
            external: ["js" ,"css", "fontawesome"]
          },
          product,
          messages,
          user: req.session.user
        });
      });
    });
  } else {
    return res.redirect("/messages/dashboard");
  }
};
