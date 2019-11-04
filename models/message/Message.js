const mongoose = require('mongoose');

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
  ownerName: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  productName: {
    type: String, 
    required: true
  }, 
  productPhoto: {
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
