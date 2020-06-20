const Campaign = require('../../../../models/campaign/Campaign');

module.exports = (req, res) => {
  Campaign
    .find({})
    .sort({ created_at: -1 })
    .then(campaigns => {
      return res.render('admin/campaigns', {
        page: 'admin/campaigns',
        title: 'Çekiliş',
        includes: {
          external: ['css', 'js', 'admin_general_css', 'fontawesome']
        },
        campaigns
      });
    })
    .catch(err => {
      return res.redirect('/admin');
    })
}
