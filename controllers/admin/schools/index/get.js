const School = require('../../../../models/school/School');

module.exports = (req, res) => {
  School.find({}, (err, schools) => {
    if (err) return res.redirect('/');

    return res.render('admin/schools', {
      page: 'admin/schools',
      title: 'Okullar',
      includes: {
        external: ['css', 'js', 'admin_general_css', 'fontawesome']
      },
      schools
    });
  });
}
