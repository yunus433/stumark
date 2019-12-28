const mongoose = require('mongoose');
const { Expo } = require('expo-server-sdk');

const User = require('../models/user/User');

module.exports = (data, callback) => {
  const expo = new Expo();
  
  User.findById(mongoose.Types.ObjectId(data.to), (err, user) => {
    if (err) return callback(err);
    if (!user || !user.notificationToken) return callback("User not found");

    const messages = [];
    data.messages.forEach(message => {
      messages.push({
        to: data.to,
        sound: 'default',
        body: message.body,
        data: { withSome: message.content },
      });
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          return callback(error);
        }
      }
    })();

    let receiptIds = [];
    for (let ticket of tickets) {
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }
    
    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
      for (let chunk of receiptIdChunks) {
        try {
          let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

          for (let receipt of receipts) {
            if (receipt.status === 'ok') {
              continue;
            } else if (receipt.status === 'error') {
              if (receipt.details && receipt.details.error) {
                User.findByIdAndUpdate(mongoose.Types.ObjectId(data.to), {$set: {
                  notificationToken: null
                }}, {}, (err, user) => {
                  if (err) callback(err);
      
                  return callback(null, user);
                });
              }
            }
          }
        } catch (error) {
          User.findByIdAndUpdate(mongoose.Types.ObjectId(data.to), {$set: {
            notificationToken: null
          }}, {}, (err, user) => {
            if (err) callback(err);

            return callback(null, user);
          });
        };
      };
    })();
  });
}
