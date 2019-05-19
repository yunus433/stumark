const moment = require('moment');
const Product = require('../../../../models/product/Product');

module.exports = (req, res, next) => {
  const newProductName = "messages." + "messages_" + req.query.user;

  Product.findByIdAndUpdate(req.query.id, {$push: {
    [newProductName]: {
        content: req.body.message,
        sender: "owner",
        createdAt: moment(Date.now()).format("dddd, MMMM Do YYYY")
      } 
  }}, {upsert: true}, err => {
    if (err) return res.redirect('/');
    
    res.redirect('/buy/messages/?id=' + req.query.id)
  });
};
