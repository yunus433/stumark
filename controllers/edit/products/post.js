const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  const keywordsArr = req.body.keywords.trim().split(" ");

  Product.findOneAndUpdate({"_id": req.query.id}, {$set: {
    "name": req.body.name,
    "description": req.body.description,
    "keywords": keywordsArr,
    "price": req.body.price
  }}, err => {
    if (err) return res.redirect('/');

    res.redirect('/sell');
  });
};
