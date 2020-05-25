const async = require("async");
const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.query && req.query.category) {
    Product.getNumberOfProducts({
      keywords: req.query.keywords,
      category: req.query.category,
      docsToSkip: parseInt(req.query.page) * parseInt(req.query.limit),
      limit: parseInt(req.query.limit)
    },  (err, number) => {
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

            let category = "Tüm Kategoriler";

            switch (req.query.category) {
              case "book": 
                category = "Kitap";
                break;
              case "stationery": 
                category = "Kırtasiye";
                break;
              case "electronic":
                category = "Elektronik";
                break;
              case "hobby":
                category = "Eğlence, Hobi";
                break;
              case "fashion":
                category = "Moda, Giyim";
                break;
              case "lesson":
                category = "Ders, Kurs";
                break;
              case "exchange":
                category = "Hediye, Takas";
                break;
              case "fun":
                category = "Müzik, Film";
                break;
              case "donation":
                category = "Bağış";
                break;
              case "rented":
                category = "Kiralık Ev";
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
              number: parseInt(number),
              user: req.session.user,
              productPage: parseInt(req.query.page),
              realCategory: req.query.category,
              category,
              keywords: req.query.keywords,
              limit: parseInt(req.query.limit)
            });
          }
        );
      });
    });
  } else {
    return res.redirect('/');
  }
};
