const mongoose = require('mongoose');

const Campaign = require('../../models/campaign/Campaign');
const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.session || !req.session.user || !req.query || !req.query.id)
    return res.redirect('/');

  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user)
      return res.redirect('/');

    if (user.campaigns && user.campaigns.includes(req.query.id))
      return res.redirect('/');

    Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$push: {
      participants: user._id.toString()
    }}, {}, (err, campaign) => {
      if (err) return res.redirect('/');

      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$push: {
        campaigns: campaign._id.toString()
      }}, {new: true}, (err, user) => {
        if (err) return res.redirect('/');

        req.session.user = user;

        return res.redirect('/');
      });
    });
  });
}
