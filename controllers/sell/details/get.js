const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  Product.findOne({
    "_id": mongoose.Types.ObjectId(req.query.id),
    "owner": req.session.user._id.toString()
  }, (err, product) => {
    if (err) return res.redirect('/');

    res.render("sell/details", {
      page: "sell/details",
      title: `Product Details`,
      includes: {
        external: ["css", "js", "fontawesome"]
      },
      product,
      user: req.session.user,
    });
  });
};
