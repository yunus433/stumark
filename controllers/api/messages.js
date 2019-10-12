const mongoose = require('mongoose');
const _ = require('lodash');
const async = require('async');

const Message = require('../../models/message/Message');
const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    Message.findById(mongoose.Types.ObjectId(req.query.id), (err, message) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ message });
    });
  } else if (req.query && req.query.buyer && req.query.product) {
    Message.find({
      "buyerId": req.query.buyer,
      "productId": req.query.product
    }, (err, messages) => {
      if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
      Message.updateMany({
        "buyerId": req.query.buyer,
        "productId": req.query.product,
        "sendedBy": req.query.sendedBy,
        "read": false
      }, { $set: {
        read: true} 
      }, {}, (err, response) => {
        if (err) return res.status(500).json({ "error": "Mongo Error: " + err });

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.user), { $inc: {
          "notReadMessage": -1 * response.nModified
        }}, {}, (err, user) => {
          if (err) return res.status(500).json({ "error": "Mongo Error: " + err });

          return res.status(200).json({ messages });
        });
      });
    });
  } else if (req.query && req.query.buyer) {
    Message.find({
      "buyerId": req.query.buyer
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ messages: Object.values(_.groupBy(messages, message => { return message.productId })) });
    });
  } else if (req.query && req.query.owner) {
    Message.find({
      "ownerId": req.query.owner
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      const newMessages = Object.values(_.groupBy(messages, message => { return message.productId }));
      async.times(
        newMessages.length,
        (time, next) => {
          next(null, Object.values(_.groupBy(newMessages[time], message => { return message.buyerId })))
        },
        (err, messages) => {
          if (err) return res.status(500).json({ "error": err });

          return res.status(200).json({ messages });
        }
      );
    });
  } else if (req.query && req.query.product) {
    Message.find({
      "productId": req.query.product
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ messages });
    });
  } else {
    Message.find({}, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ messages });
    });
  }
};
