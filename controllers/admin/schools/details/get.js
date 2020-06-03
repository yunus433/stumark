const mongoose = require('mongoose');

const School = require('../../../../models/school/School');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  School.findById(mongoose.Types.ObjectId(req.query.id), (err, school) => {
    if (err) return res.redirect('/');

    return res.render('admin/schools/details', {
      page: 'admin/schools/details',
      title: school.name,
      includes: {
        external: ['css', 'admin_general_css', 'fontawesome']
      },
      school
    });
  });
}
