const moment = require('moment-timezone');

const Product = require('../models/product/Product');
const Message = require('../models/message/Message');
const User = require('../models/user/User');

const sendNotification = require('../utils/sendNotification');

module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });

  socket.on('newMessageSend', (params, callback) => {
    const newMessageData = {
      content: params.message.content,
      sendedBy: params.message.sendedBy,
      read: false,
      createdAt: moment(Date.now()).tz("Europe/Berlin").format("HH[:]mm A [/] DD[.]MM[.]YYYY")
    };

    if (io.sockets.adapter.rooms[params.to]) {
      newMessageData.read = true;

      Message.findOneAndUpdate({
        "buyer": params.message.buyerId,
        "owner": params.message.ownerId,
        "product": params.message.productId
      }, {
        $push: {
          "messages": newMessageData
        }
      }, {upsert: true}, err => {
        if (err) return callback(err);

        socket.to(params.to).emit('newMessage', {message: newMessageData});
        return callback(undefined, newMessageData);
      });
    } else {
      Message.findOneAndUpdate({
        "buyer": params.message.buyerId,
        "owner": params.message.ownerId,
        "product": params.message.productId
      }, {
        $push: {
          "messages": newMessageData
        }
      }, {upsert: true}, err => {
        if (err) return callback(err);

        if (params.message.sendedBy == 'buyer') {
          Product.findById(params.message.productId, (err, product) => {
            if (err) return callback(err);

            User.findByIdAndUpdate(product.owner, {$inc: {
              "notReadMessage": 1
            }}, err => {
              if (err) return callback(err);
  
              socket.to(params.to).emit('newMessage', {newMessageData});
              sendNotification('send one', {
                "to": product.owner,
                "messages": [{
                  body: `Du hast eine neue Nachricht für dein Produkt ${product.name}`, 
                  data: "Click to see the message"
                }]
              }, (err, res) => {
                if (err) console.log(err);

                return callback(undefined, newMessageData);
              });
            });
          });
        } else {
          User.findByIdAndUpdate(newMessageData.buyer, {$inc: {
            "notReadMessage": 1
          }}, err => {
            if (err) return callback(err);

            socket.to(params.to).emit('newMessage', {newMessageData});
            sendNotification('sendOne', {
              "to": newMessageData.buyer,
              "messages": [{
                body: `Du hast eine neue Nachricht von dem Besitzer des Produkts ${product.name}`, 
                data: "Click to see the message"
              }]
            }, (err, res) => {
              if (err) console.log(err);

              return callback(undefined, newMessageData);
            });
          });
        };
      });
    };
  });
};
