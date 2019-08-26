const mongoose = require('mongoose');
const _ = require('lodash');

const Message = require('../../models/message/Message');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    Message.findById(mongoose.Types.ObjectId(req.query.id), (err, message) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ message });
    });
  } else if (req.query && req.query.buyer) {
    Message.find({
      "buyerId": req.query.buyer
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ messages: Object.values(_.groupBy(messages, message => { return message.productId })) });
    });
  }  else if (req.query && req.query.owner) {
    Message.find({
      "owner": req.query.owner
    }, (err, messages) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ messages: Object.values(_.groupBy(messages, message => { return message.productId })) });
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
