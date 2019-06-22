const async = require("async");
const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.query && req.query.category) {
    Product.getNumberOfProducts(req.query.category, req.query.keywords, (err, number) => {
      if (err) return res.redirect('/');

      Product.getLatest({
        keywords: req.query.keywords,
        category: req.query.category,
        docsToSkip: parseInt(req.query.page) * parseInt(req.query.limit),
        limit: parseInt(req.query.limit)
      }, (err, latestProducts) => {
        if (err) return res.redirect('/');

        async.times(
          latestProducts.length,
          (time, next) => {
            Product.findById(latestProducts[time], (err, returnedProduct) => {
              next(err, returnedProduct);
            });
          },
          (err, products) => {
            if (err) return res.redirect("/");
        
            return res.render("buy/dashboard", {
              page: "buy/dashboard",
              title: "Buy",
              includes: {
                external: ["css", "js", "fontawesome"]
              },
              products,
              number,
              user: req.session.user,
              productPage: req.query.page,
              category: req.query.category,
              keywords: req.query.keywords,
              limit: req.query.limit
            });
          }
        );
      });
    });
  } else {
    return res.redirect('/');
  }
};
