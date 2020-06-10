const async = require('async');
const mongoose = require('mongoose');

const School = require('../../../models/school/School');

module.exports = (req, res, next) => {
  let error = null;

  if (req.session.error) {
    error = req.session.error;
    req.session.destroy();
  }
  
  School.find({}, (err, schools) => {
    if (err) return res.redirect('/');

    async.times(
      schools.length,
      (time, next) => {
        School.findById(mongoose.Types.ObjectId(schools[time]._id), (err, school) => next(err, {
          _id: school.id,
          name: school.name
        }));
      },
      (err, schools) => {
        if (err) return res.redirect('/');

        return res.render('auth/register', {
          page: 'auth/register',
          title: 'Kaydol',
          includes: {
            external: ['auth_css', 'js', 'fontawesome']
          },
          error,
          schools
        });
      }
    );
  });
}
