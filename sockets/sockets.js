const moment = require('moment');

const Product = require('../models/product/Product');
const Message = require('../models/message/Message');
const User = require('../models/user/User');

module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });

  socket.on('newMessageSend', (params, callback) => {
    const newMessageData = {
      content: params.message.content,
      buyerId: params.message.buyerId,
      buyerName: params.message.buyerName,
      sendedBy: params.message.sendedBy,
      ownerName: params.message.ownerName,
      productId: params.message.productId,
      productName: params.message.productName,
      productProfile: params.message.productProfile,
      read: false,
      createdAt: moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY")
    };

    if (io.sockets.adapter.rooms[params.to]) {
      newMessageData.read = true;

      const newMessage = new Message(newMessageData);

      newMessage.save((err, message) => {
        if (err) return callback(err);

        socket.to(params.to).emit('newMessage', {message});
        return callback(undefined, message);
      });
    } else {
      const newMessage = new Message(newMessageData);

      newMessage.save((err, message) => {
        if (err) return callback(err);

        if (params.message.sendedBy == 'buyer') {
          Product.findById(params.message.productId, (err, product) => {
            if (err) return callback(err);

            User.findByIdAndUpdate(product.owner, {$inc: {
              "notReadMessage": 1
            }}, err => {
              if (err) return callback(err);
  
              socket.to(params.to).emit('newMessage', {message});
              return callback(undefined, params.message);
            });
          });
        } else {
          User.findByIdAndUpdate(message.buyerId, {$inc: {
            "notReadMessage": 1
          }}, err => {
            if (err) return callback(err);

            socket.to(params.to).emit('newMessage', {message});
            return callback(undefined, message);
          });
        };
      });
    };
  });
};
