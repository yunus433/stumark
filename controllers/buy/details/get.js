const async = require('async');
const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findById(req.query.id, (err, product) => {
      if (err) return res.redirect("/");

      Product.getLatest({
        category: JSON.parse(JSON.stringify(product)).category,
        docsToSkip: 0,
        limit: 9
      }, (err, latestProducts) => {
        if (err) return res.redirect('/');

        async.times(
          latestProducts.length,
          (time, next) => {
            Product.findById(latestProducts[time], (err, returnedProduct) => {
              next(err, returnedProduct);
            });
          },
          (err, similarProducts) => {
            if (err) return res.redirect("/");

            const messageName = "messages_" + req.session.user._id;

            if (product.messages[messageName])
              res.redirect('/buy/messages/?id=' + product._id)
            else 
              res.render("buy/details", {
                page: "buy/details",
                title: product.name,
                includes: {
                  external: ["css", "js", "fontawesome"]
                },
                product,
                similarProducts,
                user: req.session.user
              });
        });
      });   
    });
  } else {
    res.redirect("/buy");
  }
};
