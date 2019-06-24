const moment = require('moment');
const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  const newProductName = "messages." + "messages_" + req.session.user._id;

  Product.findByIdAndUpdate(req.query.id, {$push: {
    [newProductName]: {
        content: req.body.message,
        sender: {
          _id: req.session.user._id,
          name: req.session.user.name
        }, 
        createdAt: moment(Date.now()).format("dddd, MMMM Do YYYY")
      } 
  }}, {upsert: true}, err => {
    if (err) return res.redirect('/');
    
    res.redirect('/buy/messages/?id=' + req.query.id)
  });
};
