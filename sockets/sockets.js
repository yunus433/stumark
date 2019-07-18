const moment = require('moment');

const Product = require('../models/product/Product');
const User = require('../models/user/User');

module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });

  socket.on('newMessageSend', (params, callback) => {
    params.message.createdAt = moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY");

    if (io.sockets.adapter.rooms[params.id].length > 1) {
      params.message.read = true;
      Product.findByIdAndUpdate(params.id, {$push: {
        "messages": params.message
      }}, err => {
        if (err) return callback(err);

        socket.to(params.id).emit('newMessage', {
          message: params.message
        });
        return callback(undefined, params.message);
      });
    } else {
      Product.findByIdAndUpdate(params.id, {$push: {
        "messages": params.message
      }}, (err, product) => {
        if (err) return callback(err);

        if (params.message.sendedBy == 'buyer') {
          User.findByIdAndUpdate(product.owner, {$inc: {
            "notReadMessage": 1
          }}, err => {
            if (err) return callback(err);

            socket.to(params.id).emit('newMessage', {
              message: params.message
            });
            return callback(undefined, params.message);
          });
        } else {
          User.findByIdAndUpdate(params.message.buyerId, {$inc: {
            "notReadMessage": 1
          }}, err => {
            if (err) return callback(err);

            socket.to(params.id).emit('newMessage', {
              message: params.message
            });
            return callback(undefined, params.message);
          });
        }
      });
    }
  });
};
