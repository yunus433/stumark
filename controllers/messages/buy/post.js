const moment = require('moment');
const mongoose = require('mongoose');

const Message = require('../../../models/message/Message');
const Product = require('../../../models/product/Product');
const User = require('../../../models/user/User');

module.exports = (req, res) => {
  Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
    if (err) return res.redirect('/');

    User.findById(mongoose.Types.ObjectId(product.owner), (err, user) => {
      const newMessageData = {
        content: req.body.message,
        sendedBy: "buyer",
        buyerId: req.session.user._id,
        buyerName: req.session.user.name,
        ownerName: user.name,
        ownerId: user._id,
        productId: req.query.id,
        productName: product.name,
        productProfile: product.productPhotoArray[0],
        read: false,
        createdAt: moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY")
      };
    
      const newMessage = new Message(newMessageData);
    
      newMessage.save(err => {
        if (err) return res.redirect('/');
    
        return res.redirect('/messages/buy/?id=' + req.query.id);
      });
    });
  });
};
