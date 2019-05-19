const async = require("async");
const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.query) {
    const beforeNumber = req.query.page - 1;
    let afterNumber = 0;
    Product.estimatedDocumentCount({}, (err, number) => {
      if (err) return res.redirect("/");

      if (number > req.query.page * 50) {
        afterNumber = Number(req.query.page) + 1;
      }
    });

    if (req.query.keywords) {
      Product.getLatestWithKeywords(
        (req.query.page - 1) * 50,
        req.query.keywords,
        (err, latestProducts) => {
          if (err)
            return res.render("buy/dashboard", {
              page: "buy/dashboard",
              title: "Buy",
              includes: {
                external: ["css", "js", "fontawesome"]
              },
              products,
              beforeNumber,
              afterNumber,
              user: req.session.user
            });

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
                beforeNumber,
                afterNumber,
                user: req.session.user
              });
            }
          );
        }
      );
    } else {
      Product.getLatest((req.query.page - 1) * 50, (err, latestProducts) => {
        if (err)
          return res.render("buy/dashboard", {
            page: "buy/dashboard",
            title: "Buy",
            includes: {
              external: ["css", "js", "fontawesome"]
            },
            products,
            beforeNumber,
            afterNumber,
            user: req.session.user
          });

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
              beforeNumber,
              afterNumber,
              user: req.session.user
            });
          }
        );
      });
    }
  } else {
    return res.redirect("/");
  }
};
