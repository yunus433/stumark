const mongoose = require('mongoose');
const _ = require('lodash');

const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findOne({
      "_id": mongoose.Types.ObjectId(req.query.id),
      "owner": req.session.user._id.toString()
    }, (err, product) => {
      if (err) return res.redirect("/buy");

      const messages = _.groupBy(product.messages, message => { return message.buyerId });

      return res.render("sell/messages", {
        page: "sell/messages",
        title: "Your messages",
        includes: {
          external: ["js" ,"css", "fontawesome"]
        },
        product,
        messages,
        user: req.session.user
      });
    });
  } else {
    res.redirect("/sell");
  }
};
