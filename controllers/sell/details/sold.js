const async = require('async');
const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Chat = require('../../../models/chat/Chat');
const User = require('../../../models/user/User');

const deleteChat = (id, callback) => {
  Chat.findByIdAndDelete(mongoose.Types.ObjectId(id), (err, chat) => {
    if (err) return callback(err);

    User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.buyer), {
      $pull: {
        buyerChatList: chat._id.toString()
      },
      $inc: {
        notReadMessage: -1 * chat.messages.filter(message => message.sendedBy == chat.owner && !message.read).length
      }
    }, {}, err => {
      if (err) return callback(err);

      User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.owner), {
        $pull: {
          ownerChatList: chat._id.toString()
        },
        $inc: {
          notReadMessage: -1 * chat.messages.filter(message => message.sendedBy == chat.buyer && !message.read).length
        }
      }, {}, err => {
        if (err) return callback(err);
  
        return callback(null);
      });
    });
  });
}

module.exports = (req, res, next) => {
  Product.findOneAndUpdate({    
    "_id": mongoose.Types.ObjectId(req.query.id),
    "owner": req.session.user._id.toString()
  }, {"price": "SOLD"}, (err, product) => {
    if (err) return res.redirect('/');

    async.times(
      product.chatList.length,
      (time, next) => deleteChat(product.chatList[time], err => next(err, true)),
      err => {
        if (err) return res.redirect('/');

        return res.redirect('/sell');
      }
    );
  });
};
