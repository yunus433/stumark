const Product = require('../../../models/product/Product');


module.exports = (req, res, next) => {
  Product
    .find({"owner._id": req.session.user._id}, 
    (err, products) => {
      if (err) return res.redirect('/');
    
      return res.render('sell/dashboard', {
        page: 'sell/dashboard',
        title: 'Sell',
        includes: {
          external: ['css', 'js', 'fontawesome']
        },
        products,
        user: req.session.user
      });
    });
}
