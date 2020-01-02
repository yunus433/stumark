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
        to: user.notificationToken,
        sound: 'default',
        body: message.body,
        data: { withSome: message.data },
      });
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    console.log("chunks: ", chunks);
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          return callback(error);
        }
      }
    })().then(() => {
      console.log("tickets: ", tickets);
      let receiptIds = [];
      for (let ticket of tickets) {
        if (ticket.id) {
          receiptIds.push(ticket.id);
        }
      }
      console.log("receiptIds: ", receiptIds);
      let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
      console.log("receiptIdChunks: ", receiptIdChunks);
      (async () => {
        for (let chunk of receiptIdChunks) {
          try {
            let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

            for (let receipt of receipts) {
              if (receipt.status === 'ok') {
                return callback(null, "send notification");
                // continue;
              } else if (receipt.status === 'error') {
                if (receipt.details && receipt.details.error) {
                  User.findByIdAndUpdate(mongoose.Types.ObjectId(data.to), {$set: {
                    notificationToken: null
                  }}, {}, (err, user) => {
                    if (err) return callback(err);
        
                    return callback(null, "update user because of error: " + receipt.details.error);
                  });
                }
              }
            }
          } catch (error) {
            User.findByIdAndUpdate(mongoose.Types.ObjectId(data.to), {$set: {
              notificationToken: null
            }}, {}, (err, user) => {
              if (err) return callback(err);

              return callback(null, "update user because of error: " + error);
            });
          };
        };
      })().then(() => {
        return callback(null, "no response");
      });
    });
  });
}
