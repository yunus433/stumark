const moment = require('moment-timezone');
const mongoose = require('mongoose');

const Message = require('../../../models/message/Message');
const Product = require('../../../models/product/Product');
const User = require('../../../models/user/User');

module.exports = (req, res) => {
  Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
    if (err) return res.redirect('/');

    User.findById(mongoose.Types.ObjectId(product.owner), (err, user) => {
      if (err) return res.redirect('/');
      
      const newMessageData = {
        buyer: req.session.user._id,
        buyerName: req.session.user.name,
        owner: user._id,
        ownerName: user.name,
        product: req.query.id,
        productName: product.name,
        productPhoto: product.productPhotoArray[0],
        messages: [
          {
            content: req.body.message,
            sendedBy: "buyer",
            createdAt: moment(Date.now()).tz("Europe/Berlin").format("HH[:]mm A [/] DD[.]MM[.]YYYY"),
            read: false
          }
        ]
      };
    
      const newMessage = new Message(newMessageData);
    
      newMessage.save(err => {
        if (err) return res.redirect('/');
    
        return res.redirect('/messages/buy/?id=' + req.query.id);
      });
    });
  });
};
