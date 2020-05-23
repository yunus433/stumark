const mongoose = require('mongoose');

const Chat = require('../../../../models/chat/Chat');
const User = require('../../../../models/user/User');
const Product = require('../../../../models/product/Product');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.query.user) return res.status(400).json({ error: 'bad request' });

  Chat.findById(mongoose.Types.ObjectId(req.query.id), (err, chat) => {
    if (err || !chat) return res.status(500).json({ error: 'mongo error: ' + err });

    if (chat.buyer != req.query.user.toString() && chat.owner != req.query.user.toString())
      return res.status(500).json({ error: 'not authenticated request' });

    User.findById(mongoose.Types.ObjectId(chat.buyer), (err, buyer) => {
      if (err) return res.status(500).json({ error: 'mongo error: ' + err });

      User.findById(mongoose.Types.ObjectId(chat.owner), (err, owner) => {
        if (err) return res.status(500).json({ error: 'mongo error: ' + err });
  
        Product.findById(mongoose.Types.ObjectId(chat.product), (err, product) => {
          if (err) return res.status(500).json({ error: 'mongo error: ' + err });

          let modified_number = 0;
          chat.messages = chat.messages.map(message => {
            if (message.sendedBy != req.query.user && !message.read) {
              message.read = true;
              modified_number++;
            }

            return message;
          });

          Chat.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
            messages: chat.messages
          }}, {new: true}, (err, chat) => {
            if (err) return res.status(500).json({ error: 'mongo error: ' + err });

            User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.user), {$inc: {
              notReadMessage: -1 * modified_number
            }}, {new: true}, (err, user) => {
              if (err) return res.status(500).json({ error: 'mongo error: ' + err });

              const new_chat = {
                _id: chat._id,
                buyer,
                owner,
                product,
                messages: chat.messages,
                createdAt: chat.createdAt 
              };

              return res.status(200).json({
                chat: new_chat
              });
            });
          });
        });
      });
    });
  });
};
