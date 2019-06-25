const moment = require('moment');
const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findById(mongoose.Types.ObjectId(req.query.user), (err, user) => {
    if (err) return res.redirect('/');

    const newMessage = {
      content: req.body.message,
      buyerId: user._id,
      buyerName: user.name,
      buyerProfile: user.profilePhoto,
      sendedBy: "owner",
      read: true,
      createdAt: moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY")
    };
  
    Product.findByIdAndUpdate(req.query.id, {$push: {
      "messages": newMessage
    }}, {upsert: true}, err => {
      if (err) return res.redirect('/');
      
      res.redirect('/sell/messages/details/?id=' + req.query.id + "&user=" + req.query.user);
    });
  });
};
