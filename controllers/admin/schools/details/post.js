const mongoose = require('mongoose');

const School = require('../../../../models/school/School');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.name || !req.body.city)
    return res.redirect('/admin');

  School.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    name: req.body.name,
    city: req.body.city,
    other_names: req.body.other_names && req.body.other_names.length ? req.body.other_names.split(',').map(school => school.trim().toLocaleLowerCase()) : []
  }}, {}, (err, school) => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/schools/details?id=' + school._id.toString());
  });
}
