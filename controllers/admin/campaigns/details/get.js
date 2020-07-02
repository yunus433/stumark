const async = require('async');
const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');
const User = require('../../../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Campaign.findById(mongoose.Types.ObjectId(req.query.id), (err, campaign) => {
    if (err) return res.redirect('/admin');

    async.times(
      campaign.participants.length,
      (time, next) => User.findById(mongoose.Types.ObjectId(campaign.participants[time]), (err, user) => next(err, user)),
      (err, participants) => {
        if (err) return res.redirect('/admin');

        return res.render('admin/campaigns/details', {
          page: 'admin/campaigns/details',
          title: campaign.name,
          includes: {
            external: ['css', 'js', 'admin_general_css', 'fontawesome']
          },
          campaign,
          participants
        });
      }
    );
  });
}
