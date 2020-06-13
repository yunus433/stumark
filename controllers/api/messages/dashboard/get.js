const async = require('async');
const mongoose = require('mongoose');

const Chat = require('../../../../models/chat/Chat');
const User = require('../../../../models/user/User');
const Product = require('../../../../models/product/Product');

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
  if (!req.query || !req.query.id)
    return res.status(400).json({ error: 'bad request' });

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'user not found' });

    Chat.find({
      "_id": {$in: user.buyerChatList}
    }, (err, buyerMessages) => {
      if (err) return res.status(500).json({ "error": "mongo Error: " + err });

      Chat.find({
        "_id": {$in: user.ownerChatList}
      }, (err, ownerMessages) => {
        if (err) return res.status(500).json({ "error": "mongo Error: " + err });

        async.times(
          buyerMessages.length,
          (time, next) => {
            getChatContent(buyerMessages[time], (err, chat) => next(err, chat))
          },
          (err, buyerMessages) => {
            if (err) return res.status(500).json({ "error": "mongo Error: " + err });

            async.times(
              ownerMessages.length,
              (time, next) => getChatContent(ownerMessages[time], (err, chat) => next(err, chat)),
              (err, ownerMessages) => {
                if (err) return res.status(500).json({ "error": "mongo Error: " + err });

                const chat_list = buyerMessages.concat(ownerMessages);

                chat_list.sort((a, b) => {
                  if (a.messages[a.messages.length-1].day != b.messages[b.messages.length-1].day)
                    return a.messages[a.messages.length-1].day < b.messages[b.messages.length-1].day;

                  a.messages[a.messages.length-1].time != b.messages[b.messages.length-1].time
                });

                return res.status(200).json({ chat_list });
              }
            );
          }
        );
      });
    });
  })
};
