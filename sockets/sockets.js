const moment = require('moment');

const Product = require('../models/product/Product');

module.exports = socket => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });

  socket.on('newMessageSend', (params, callback) => {
    params.message.createdAt = moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY");

    Product.findByIdAndUpdate(params.id, {$push: {
      "messages": params.message
    }}, {upsert: true}, err => {
      if (err) return callback(err);
      
      socket.to(params.id).emit('newMessage', {
        message: params.message
      });
    });
  });
};
