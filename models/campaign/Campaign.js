const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  end_date: {
    type: Object,
    required: true
  },
  created_at: {
    type: Number,
    default: (new Date()).getTime()
  },
  participants: {
    type: Array,
    default: []
  },
  winner: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
