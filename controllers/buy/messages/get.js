const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.query && req.query.id) {
    Product.findById(req.query.id, (err, product) => {
      if (err) return res.redirect("/buy");
      const messageName = "messages_" + req.session.user._id;
      let messages = [];

      if (product.messages[messageName])
        messages = product.messages[messageName];
        
      product.messages = {};
      res.render("buy/messages", {
        page: "buy/messages",
        title: "Send a message",
        includes: {
          external: ["css", "js", "fontawesome"]
        },
        product,
        messages,
        user: req.session.user
      });
    });
  } else {
    res.redirect("/buy");
  }
};
