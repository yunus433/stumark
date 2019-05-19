const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  const keywordsArr = req.body.keywords.trim().split(" ");
  const newProductData = {
    name: req.body.name,
    price: req.body.price,
    keywords: keywordsArr,
    description: req.body.description,
    owner: req.session.user,
    documentIndex: -1
  };

  const newProduct = new Product(newProductData);

  newProduct.save((err, product) => {
    if (err) return res.redirect('/');

    Product.count({}, (err, number) => {
      if (err) return res.redirect('/');

      Product.findByIdAndUpdate(product._id, {$set: {
        documentIndex: number
      }}, {upsert: true, new: true}, err => {
        if (err) return res.redirect('/');
        
        User.findByIdAndUpdate(req.session.user._id, {$push: {
          "products": product._id
        }}, {upsert: true, new: true}, (err, user) => {
          if (err) res.redirect('/');
    
          req.session.user = user;
          return res.redirect('/sell');
        });
      });
    });
  });
};
