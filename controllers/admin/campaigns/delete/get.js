const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Campaign.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), err => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/campaigns');
  });
}
