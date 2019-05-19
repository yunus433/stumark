const async = require('async');
const Product = require("../../../models/product/Product");
const User = require("../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findById(req.query.id, (err, product) => {
      if (err) return res.redirect("/buy");
      const messages = Object.entries(product.messages);

      async.times(
        messages.length,
        (time, next) => {
          User.findById(messages[time][0].split("_")[1], (err, user) => {
            next(err, user);
          });
        },
        (err, users) => {
          if (err) return res.redirect("/");

          res.render("sell/messages", {
            page: "sell/messages",
            title: "Your messages",
            includes: {
              external: ["css", "fontawesome"]
            },
            product,
            users,
            user: req.session.user
          });
        }
      );
    });
  } else {
    res.redirect("/sell");
  }
};
