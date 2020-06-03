const mongoose = require('mongoose');

const School = require('../../../../models/school/School');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  School.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), err => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/schools');
  });
}
