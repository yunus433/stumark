const mongoose = require('mongoose');

const Product = require('../../../../models/product/Product');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Product.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), err => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/products');
  });
}
