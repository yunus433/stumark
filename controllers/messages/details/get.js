const mongoose = require('mongoose');

const Chat = require('../../../models/chat/Chat');
const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  if (!req.query || !req.query.id) return res.redirect('/');

  Chat.findById(mongoose.Types.ObjectId(req.query.id), (err, chat) => {
    if (err || !chat) return res.redirect('/');

    if (chat.buyer != req.session.user._id.toString() && chat.owner != req.session.user._id.toString())
      return res.redirect('/');

    User.findById(mongoose.Types.ObjectId(chat.buyer), (err, buyer) => {
      if (err) return res.redirect('/');

      User.findById(mongoose.Types.ObjectId(chat.owner), (err, owner) => {
        if (err) return res.redirect('/');
  
        Product.findById(mongoose.Types.ObjectId(chat.product), (err, product) => {
          if (err) return res.redirect('/');

          let modified_number = 0;
          chat.messages = chat.messages.map(message => {
            if (message.sendedBy != req.session.user._id && !message.read) {
              message.read = true;
              modified_number++;
            }

            return message;
          });

          Chat.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
            messages: chat.messages
          }}, {new: true}, (err, chat) => {
            if (err) return res.redirect('/');

            User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$inc: {
              notReadMessage: -1 * modified_number
            }}, {new: true}, (err, user) => {
              if (err) return res.redirect('/');

              req.session.user = user;
              const new_chat = {
                _id: chat._id,
                buyer,
                owner,
                product,
                messages: chat.messages,
                createdAt: chat.createdAt 
              };

              return res.render('messages/details', {
                page: 'messages/details',
                title: product.name,
                includes: {
                  external: ['js', 'css', 'socket.io', 'fontawesome']
                },
                chat: new_chat,
                user
              });
            });
          });
        });
      });
    });
  });
};
