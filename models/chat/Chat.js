const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  buyer: {
    type: String,
    required: true
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

module.exports = mongoose.model('Chat', ChatSchema);
