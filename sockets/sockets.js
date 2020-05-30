const crypto = require('crypto');
const moment = require('moment-timezone');
const mongoose = require('mongoose');

const Product = require('../models/product/Product');
const Chat = require('../models/chat/Chat');
const User = require('../models/user/User');

const sendNotification = require('../utils/sendNotification');

module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });

  socket.on('leave', params => {
    socket.leave(params.room.toString());
  });


  socket.on('newMessageSend', (params, callback) => {
    if (!params.message || !params.message.content || !params.message.sendedBy || !params.to)
      return callback('bad request');

    const newMessageData = {
      _id: crypto.randomBytes(17).toString('hex'),
      content: params.message.content,
      sendedBy: params.message.sendedBy,
      read: false,
      time: moment(Date.now()).tz("Europe/Istanbul").format("HH[:]mm"),
      day: moment(Date.now()).tz("Europe/Istanbul").format("DD[.]MM[.]YYYY")
    };

    Chat.findByIdAndUpdate(mongoose.Types.ObjectId(params.to), {$push: {
      messages: newMessageData
    }}, {}, (err, chat) => {
      if (err) return callback(err);

      if (params.message.sendedBy != chat.buyer) {
        User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.owner), {$inc: {
          notReadMessage: 1
        }}, {}, (err, owner) => {
          if (err) return res.redirect('/');

          sendNotification('send one', {
            "to": chat.buyer,
            "messages": [{
              title: owner.name,
              body: params.message.content, 
              data: "Mesajı görmek için tıklayın."
            }]
          }, (err, res) => {
            if (err) console.log(err, res);
          
            socket.to(params.to).emit("newMessage", {
              message: newMessageData
            });
            return callback(undefined, newMessageData);
          });
        });
      } else {
        User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.buyer), {$inc: {
          notReadMessage: 1
        }}, {}, (err, buyer) => {
          if (err) return res.redirect('/');

          sendNotification('send one', {
            "to": chat.owner,
            "messages": [{
              title: buyer.name,
              body: params.message.content, 
              data: "Mesajı görmek için tıklayın."
            }]
          }, (err, res) => {
            if (err) console.log(err, res);
          
            socket.to(params.to).emit("newMessage", {
              message: newMessageData
            });
            return callback(undefined, newMessageData);
          });
        });
      }
    });
  });
};
