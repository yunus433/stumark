const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.winners)
    return res.redirect('/admin');

  Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    ended: true,
    winners: req.body.winners.split(',').map(winner => winner.trim())
  }}, {}, err => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/campaigns');
  });
} 
