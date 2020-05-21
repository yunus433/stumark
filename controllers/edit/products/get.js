const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findById(req.query.id, (err, product) => {
      if (err) return res.redirect('/');

      return res.render('edit/products', {
        page: 'edit/products',
        title: 'Ürünleri Düzenle',
        includes: {
          external: ['css', 'js', 'fontawesome']
        },
        product,
        user: req.session.user
      });
    });
  } else {
    return res.redirect('/');
  };
};
