const mongoose = require('mongoose');
const { Expo } = require('expo-server-sdk');

const User = require('../models/user/User');

module.exports = (option, data, callback) => {
  console.log(data);
  const expo = new Expo();

  if (option == "send one") {
    User.findById(mongoose.Types.ObjectId(data.to), (err, user) => {
      if (err) return callback(err);
      if (!user || !user.notificationToken) return callback("User not found");

      const messages = [];
      data.messages.forEach(message => {
        messages.push({
          to: user.notificationToken,
          sound: 'default',
          title: message.title,
          body: message.body,
          data: { withSome: message.data },
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
      })().then(() => {
        let receiptIds = [];
        for (let ticket of tickets) {
          if (ticket.id) {
            receiptIds.push(ticket.id);
          }
        }
        let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
        (async () => {
          return callback(null, "send notification");
          // for (let chunk of receiptIdChunks) {
          //   try {
          //     let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
  
          //     for (let receipt of receipts) {
          //       if (receipt.status === 'ok') {
          //         return callback(null, "send notification");
          //       } else if (receipt.status === 'error') {
          //         if (receipt.details && receipt.details.error) {
          //           User.findByIdAndUpdate(mongoose.Types.ObjectId(data.to), {$set: {
          //             notificationToken: null
          //           }}, {}, (err, user) => {
          //             if (err) return callback(err);
          
          //             return callback(null, "update user because of error: " + receipt.details.error);
          //           });
          //         }
          //       }
          //     }
          //   } catch (error) {
          //     User.findByIdAndUpdate(mongoose.Types.ObjectId(data.to), {$set: {
          //       notificationToken: null
          //     }}, {}, (err, user) => {
          //       if (err) return callback(err);
  
          //       return callback(null, "update user because of error: " + error);
          //     });
          //   };
          // };
        })()
        .catch(err => {
          return callback(err);
        })
        // .then(() => {
        //   return callback(null, "no response");
        // });
      });
    });
  } else if (option == "send many") {
    const messages = [];
    data.messages.forEach(message => {
      messages.push({
        to: message.to,
        sound: 'default',
        body: message.body,
        data: { withSome: message.data },
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
          console.log(error);
        }
      }
    })().then(() => {
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
                    if (err) console.log(err);
                  });
                }
              }
            }
          } catch (error) {
            User.findByIdAndUpdate(mongoose.Types.ObjectId(data.to), {$set: {
              notificationToken: null
            }}, {}, (err, user) => {
              if (err) console.log(err);
            });
          };
        };
      })().then(() => {
        return callback(null, "ok");
      });
    });
  } else {
    return callback("Unknown option is selected");
  }
}
