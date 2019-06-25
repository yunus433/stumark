const moment = require('moment');
const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  const newMessage = {
    content: req.body.message,
    senderId: req.session.user._id,
    senderName: req.session.user.name,
    read: false,
    createdAt: moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY")
  };

  Product.findByIdAndUpdate(req.query.id, {$push: {
    "messages": newMessage
  }}, {upsert: true}, err => {
    if (err) return res.redirect('/');
    
    res.redirect('/buy/messages/?id=' + req.query.id)
  });
};
