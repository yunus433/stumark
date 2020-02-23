const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Message = require('../../../models/message/Message');

module.exports = (req, res, next) => {
  Product.findOneAndUpdate({    
    "_id": mongoose.Types.ObjectId(req.query.id),
    "owner": req.session.user._id.toString()
  }, {"price": "SOLD"}, err => {
    if (err) return res.redirect('/');

    Message.deleteMany({
      "product": mongoose.Types.ObjectId(req.query.id),
      "owner": req.session.user._id.toString()
    }, err => {
      if (err) return res.redirect('/');

      return res.redirect(`/sell/details/?id=${req.query.id}`);
    });
  });
};
