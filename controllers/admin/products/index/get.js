const different_subcategories = ['book', 'electronic', 'fashion', 'lesson'];

const Product = require('../../../../models/product/Product');

module.exports = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.redirect('/');

    return res.render('admin/products', {
      page: 'admin/products',
      title: 'Ürünler',
      includes: {
        external: ['css', 'js', 'admin_general_css', 'fontawesome']
      },
      products,
      different_subcategories
    });
  });
}
