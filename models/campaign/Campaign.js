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
  },
  ended: {
    type: Boolean,
    default: false
  }
});

CampaignSchema.statics.getLastOne = function (callback) {
  const Campaign = this;

  Campaign
    .find({ ended: false })
    .sort({ created_at: -1 })
    .then(campaigns => {
      if (campaigns.length)
        return callback(null, campaigns[0]);

      Campaign.find()
        .sort({ created_at: -1 })
        .then(campaigns => {
          if (campaigns.length)
            return callback(null, campaigns[0]);
    
          return callback(null, undefined);
        })
        .catch(err => {
          return callback(err);
        });
    })
    .catch(err => {
      return callback(err);
    });
};

module.exports = mongoose.model('Campaign', CampaignSchema);
