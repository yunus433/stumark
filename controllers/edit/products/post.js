const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {

  Product.findOneAndUpdate({"_id": req.query.id}, {$set: {
    "name": req.body.name,
    "description": req.body.description,
    "keywords": (req.body.description.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase() + "+" + req.body.name.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase()).split("+"),
    "price": req.body.price,
    "location": req.body.location
  }}, err => {
    if (err) return res.redirect('/');

    res.redirect('/sell/details/?id=' + req.query.id);
  });
};
