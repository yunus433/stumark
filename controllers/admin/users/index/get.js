const User = require('../../../../models/user/User');
const School = require('../../../../models/school/School');

module.exports = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.redirect('/admin');

    School.find({}, (err, schools) => {
      if (err) return res.redirect('/admin');

      return res.render('admin/users', {
        page: 'admin/users',
        title: 'Kullanıcılar',
        includes: {
          external: ['css', 'js', 'admin_general_css', 'fontawesome']
        },
        users,
        schools
      });
    });
  });
}
