const mongoose = require('mongoose');
const moment = require('moment-timezone');

const Chat = require('../../../../models/chat/Chat');
const User = require('../../../../models/user/User');
const Product = require('../../../../models/product/Product');

const sendNotification = require('../../../../utils/sendNotification');

module.exports = (req, res, next) => {
  if ( req.body && req.body.buyer && req.body.owner && req.body.product && req.body.content ) {
      const newChatData = {
        buyer: req.body.buyer.toString(),
        owner: req.body.owner.toString(),
        product: req.body.product.toString(),
        messages: [
          {
            content: req.body.content,
            sendedBy: req.body.buyer.toString(),
            read: false,
            time: moment(Date.now()).tz("Europe/Istanbul").format("HH[:]mm"),
            day: moment(Date.now()).tz("Europe/Istanbul").format("DD[.]MM[.]YYYY")
          }
        ]
      };

      const newChat = new Chat(newChatData);
    
      newChat.save((err, chat) => {
        if (err) return res.status(500).json({ "error": "mongo Error: " + err });

        User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.buyer), {$push: {
          buyerChatList: chat._id.toString()
        }}, {}, err => {
          if (err) return res.status(500).json({ "error": "mongo Error: " + err });

          User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.owner), {
            $push: {
              ownerChatList: chat._id.toString(),
            },
            $inc: {
              notReadMessage: 1
            }
          }, {}, (err, user) => {
            if (err) return res.status(500).json({ "error": "mongo Error: " + err });

            Product.findByIdAndUpdate(mongoose.Types.ObjectId(chat.product), {$push: {
              chatList: chat._id.toString()
            }}, {}, (err, product) => {
              if (err) return res.status(500).json({ "error": "mongo Error: " + err });

              sendNotification('send one', {
                "to": user._id,
                "messages": [{
                  body: `${product.name} ürününüze yeni bir kullanıcı mesaj attı!`, 
                  data: "Görmek için tıklayın"
                }]
              }, (err, result) => {
                if (err) console.log(err);
    
                return res.status(200).json({"id": chat._id.toString()});
              });
            });
          });
        });
      });
  } else {
    return res.status(400).json({error: "bad request"});
  }
};
