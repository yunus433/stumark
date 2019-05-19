const Product = require("../../../../models/product/Product");
const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.query && req.query.id && req.query.user) {
    Product.findById(req.query.id, (err, product) => {
      if (err) return res.redirect("/sell/messages");
        User.findById(req.query.user, (err, user) => {
          if (err) return res.redirect("/sell/messages");

          res.render("sell/messageDetails", {
            page: "sell/messageDetails",
            title: `Messages from ${user.email}`,
            includes: {
              external: ["css", "js", "fontawesome"]
            },
            product,
            messages: product.messages["messages_" + user._id],
            user: req.session.user,
            buyer: user
          });
        });
    });
  } else {
    res.redirect("/sell");
  }
};
