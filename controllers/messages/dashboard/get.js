const async = require('async');
const mongoose = require('mongoose');

const Chat = require('../../../models/chat/Chat');
const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

const getChatContent = (chat, callback) => {
  User.findById(mongoose.Types.ObjectId(chat.buyer), (err, buyer) => {
    if (err) return callback(err);

    User.findById(mongoose.Types.ObjectId(chat.owner), (err, owner) => {
      if (err) return callback(err);

      Product.findById(mongoose.Types.ObjectId(chat.product), (err, product) => {
        if (err) return callback(err);

        const newChat = {
          _id: chat._id,
          messages: chat.messages,
          buyer,
          owner,
          product,
          createdAt: chat.createdAt
        };
  
        return callback(null, newChat);
      });
    });
  });
}

module.exports = (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/');

    Chat.find({
      "_id": {$in: user.buyerChatList}
    }, (err, buyerMessages) => {
      if (err) return res.redirect('/');

      Chat.find({
        "_id": {$in: user.ownerChatList}
      }, (err, ownerMessages) => {
        if (err) return res.redirect('/');
  
        async.times(
          buyerMessages.length,
          (time, next) => getChatContent(buyerMessages[time], (err, chat) => next(err, chat)),
          (err, buyerMessages) => {
            if (err) return res.redirect('/');

            async.times(
              ownerMessages.length,
              (time, next) => getChatContent(ownerMessages[time], (err, chat) => next(err, chat)),
              (err, ownerMessages) => {
                if (err) return res.redirect('/');
    
                return res.render('messages/dashboard', {
                  page: 'messages/dashboard',
                  title: "Mesajlar",
                  includes: {
                    external: ["js", "css", "fontawesome"]
                  },
                  buyerMessages,
                  ownerMessages,
                  user: req.session.user
                });
              }
            );
          }
        );
      });
    });
  });
};
