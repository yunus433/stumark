const moment = require('moment-timezone');
const mongoose = require('mongoose');

const Chat = require('../../../models/chat/Chat');
const Product = require('../../../models/product/Product');
const User = require('../../../models/user/User');

const sendNotification = require('../../../utils/sendNotification');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/');

  Chat.findOne({
    "product": req.query.id,
    "buyer": req.session.user._id.toString()
  }, (err, chat) => {
    if (err) return res.redirect('/');
    
    if (chat) return res.redirect('/messages/details?id=' + chat._id);

    Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
      if (err || !product) return res.redirect('/');
  
      User.findById(mongoose.Types.ObjectId(product.owner), (err, user) => {
        if (err || !user) return res.redirect('/');
  
        const newChatData = {
          buyer: req.session.user._id,
          owner: user._id,
          product: req.query.id,
          messages: [
            {
              content: req.body.message,
              sendedBy: req.session.user._id.toString(),
              read: false,
              time: moment(Date.now()).tz("Europe/Istanbul").format("HH[:]mm"),
              day: moment(Date.now()).tz("Europe/Istanbul").format("DD[.]MM[.]YYYY")
            }
          ]
        };
  
        const newChat = new Chat(newChatData);
  
        newChat.save((err, chat) => {
          if (err) return res.redirect('/');

          User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.buyer), {$push: {
            buyerChatList: chat._id.toString()
          }}, {}, err => {
            if (err) return res.redirect('/');

            User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.owner), {
              $push: {
                ownerChatList: chat._id.toString(),
              },
              $inc: {
                notReadMessage: 1
              }
            }, {}, err => {
              if (err) return res.redirect('/');
  
              Product.findByIdAndUpdate(mongoose.Types.ObjectId(chat.product), {$push: {
                chatList: chat._id.toString()
              }}, {}, err => {
                if (err) return res.redirect('/');

                sendNotification('send one', {
                  "to": user._id,
                  "messages": [{
                    body: `${product.name} ürününüze yeni bir kullanıcı mesaj attı!`, 
                    data: "Görmek için tıklayın"
                  }]
                }, (err, result) => {
                  if (err) console.log(err);
      
                  return res.redirect('/messages/details?id=' + chat._id);
                });
              });
            });
          });
        });
      });
    });
  });
};
