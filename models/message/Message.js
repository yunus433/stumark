const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  buyer: {
    required: true,
    type: String
  },
  buyerName: {
    required: true,
    type: String
  },
  owner: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  messages: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Message', MessageSchema);
