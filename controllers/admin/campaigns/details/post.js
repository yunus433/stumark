const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.name || !req.body.description || !req.body.end_date_day || !req.body.end_date_month || !req.body.end_date_year)
    return res.redirect('/admin');

  Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    name: req.body.name,
    description: req.body.description,
    end_date: {
      day: req.body.end_date_day,
      month: req.body.end_date_month,
      year: req.body.end_date_year
    }
  }}, {}, err => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/campaigns');
  });
}
