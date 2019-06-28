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

            let category = "Alle Kategorien";

            switch(req.query.category) {
              case "rented": 
                category = "Mitwohnung, Nachmiete";
                break;
              case "hobby":
                category = "Freizet, Hobby";
                break;
              case "home":
                category = "Möbel, Haus";
                break;
              case "fashion":
                category = "Mode, Kleidung";
                break;
              case "electronic":
                category = "Elektronik";
                break;
              case "fun":
                category = "Musik, Filme, Bücher";
                break;
              case "tickets":
                category = "Eintrittskarten, Tickets";
                break;
              case "exchange":
                category = "Zu Verschenken, Tauschen";
                break;
              case "lesson":
                category = "Unterricht, Kurse";
                break;
              case "other":
                category = "Sonstige";
                break;
            }
        
            return res.render("buy/dashboard", {
              page: "buy/dashboard",
              title: category,
              includes: {
                external: ["css", "js", "fontawesome"]
              },
              products,
              number,
              user: req.session.user,
              productPage: req.query.page,
              realCategory: req.query.category,
              category,
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
