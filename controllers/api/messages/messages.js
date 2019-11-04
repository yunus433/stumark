const mongoose = require('mongoose');

const Message = require('../../../models/message/Message');
const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    Message.findById(mongoose.Types.ObjectId(req.query.id), (err, message) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ message });
    });
  } else if (req.query && req.query.buyer && req.query.product) {
    Message.findOne({
      "buyer": req.query.buyer,
      "product": req.query.product
    }, (err, message) => {
      if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
      let nModified = 0;

      const newMessages = message.messages.map(message => {
        if (message.sendedBy == req.query.sendedBy && !message.read){
          message.read = true;
          nModified++;
        }

        return message;
      });

      Message.findOneAndUpdate({
        "buyer": req.query.buyer,
        "product": req.query.product
      }, { $set: {
        "messages": newMessages
      }}, {}, err => {
        if (err) return res.status(500).json({ "error": "Mongo Error: " + err });

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.user), { $inc: {
          "notReadMessage": -1 * nModified
        }}, {new: true}, (err, user) => {
          if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
          
          if (sendedBy == 'buyer') {
            User.findById(mongoose.Types.ObjectId(message.buyer), (err, buyer) => {
              if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
              message.owner = user;
              message.buyer = buyer;
              return res.status(200).json({ message });
            });
          } else {
            User.findById(mongoose.Types.ObjectId(message.owner), (err, owner) => {
              if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
              message.buyer = user;
              message.owner = owner;
              return res.status(200).json({ message });
            });
          }
        });
      });
    });
  } else if (req.query && req.query.buyer) {
    Message.find({
      "buyer": req.query.buyer
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ messages });
    });
  } else if (req.query && req.query.owner) {
    Message.find({
      "owner": req.query.owner
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ messages });
    });
  } else if (req.query && req.query.product) {
    Message.find({
      "product": req.query.product
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
