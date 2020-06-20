const Campaign = require('../../../../models/campaign/Campaign');

const uploadPhoto = require('../../../../utils/uploadPhoto');

module.exports = (req, res) => {
  if (!req.body || !req.body.name || !req.body.description || !req.body.end_date_day || !req.body.end_date_month || !req.body.end_date_year || !req.file)
    return res.redirect('/admin');

  uploadPhoto(req.file.filename, req.file.size, (err, location) => {
    if (err) return res.redirect('/admin');

    const newCampaignData = {
      name: req.body.name,
      description: req.body.description,
      end_date: {
        day: req.body.end_date_day,
        month: req.body.end_date_month,
        year: req.body.end_date_year
      },
      photo: location
    };

    const newCampaign = new Campaign(newCampaignData);

    newCampaign.save(err => {
      if (err) return res.redirect('/admin');

      Campaign.collection.createIndex({ created_at: 1 }, err => {
        if (err) return res.redirect('/');

        return res.redirect('/admin/campaigns');
      });
    });
  });
}
