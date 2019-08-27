const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: {
    required: true,
    type: String
  },
  buyerId: {
    required: true,
    type: String
  },
  buyerName: {
    required: true,
    type: String
  },
  ownerName: {
    required: true,
    type: String
  },
  sendedBy: {
    required: true,
    type: String
  },
  productId: {
    required: true,
    type: String
  },
  productName: {
    required: true,
    type: String
  },
  productProfile: {
    required: true,
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: String,
    default: moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY")
  }
});

module.exports = mongoose.model('Message', MessageSchema);
