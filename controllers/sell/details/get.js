const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Message = require('../../../models/chat/Chat');

module.exports = (req, res, next) => {
  Product.findOne({
    "_id": mongoose.Types.ObjectId(req.query.id),
    "owner": req.session.user._id.toString()
  }, (err, product) => {
    if (err) return res.redirect('/');

    return res.render("sell/details", {
      page: "sell/details",
      title: `Ürün Detayları`,
      includes: {
        external: ["css", "js", "fontawesome"]
      },
      product,
      messageNumber: 0,
      user: req.session.user,
    });
  });
};
