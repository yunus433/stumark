const moment = require('moment');
const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  const newMessage = {
    content: req.body.message,
    buyerId: req.session.user._id,
    buyerName: req.session.user.name,
    sendedBy: "buyer",
    read: false,
    createdAt: moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY")
  };

  Product.findByIdAndUpdate(req.query.id, {$push: {
    "messages": newMessage
  }}, {upsert: true}, err => {
    if (err) return res.redirect('/');
    
    res.redirect('/messages/buy/?id=' + req.query.id)
  });
};
