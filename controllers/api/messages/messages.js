const mongoose = require('mongoose');

const Chat = require('../../../models/chat/Chat');
const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    Chat.findById(mongoose.Types.ObjectId(req.query.id), (err, chat) => {
      if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
      
      return res.status(200).json({ chat });
    });
  } else if (req.query && req.query.buyer && req.query.product) {
    Chat.findOne({
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

      Chat.findOneAndUpdate({
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
          
          if (req.query.sendedBy == 'buyer') {
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
    Chat.find({
      "buyer": req.query.buyer
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ messages });
    });
  } else if (req.query && req.query.owner) {
    Chat.find({
      "owner": req.query.owner
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ messages });
    });
  } else if (req.query && req.query.product) {
    Chat.find({
      "product": req.query.product
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ messages });
    });
  } else {
    Chat.find({}, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ messages });
    });
  }
};
