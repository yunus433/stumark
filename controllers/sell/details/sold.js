const async = require('async');
const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Chat = require('../../../models/chat/Chat');
const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  Product.findOneAndUpdate({    
    "_id": mongoose.Types.ObjectId(req.query.id),
    "owner": req.session.user._id.toString()
  }, {
    "price": "SATILDI",
    "price_number": -1
  }, (err, product) => {
    if (err) return res.redirect('/');

    return res.redirect('/sell');
  });
};
