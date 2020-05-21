const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Message = require('../../../models/message/Message');

module.exports = (req, res, next) => {
  Product.findOne({
    "_id": mongoose.Types.ObjectId(req.query.id),
    "owner": req.session.user._id.toString()
  }, (err, product) => {
    if (err) return res.redirect('/');

    Message.find({
      "productId": product._id,
      "read": false
    }, (err, notReadMessages) => {
      if (err) return res.redirect('/');

      res.render("sell/details", {
        page: "sell/details",
        title: `Ürün Detayları`,
        includes: {
          external: ["css", "js", "fontawesome"]
        },
        product,
        messageNumber: notReadMessages.length,
        user: req.session.user,
      });
    });
  });
};
