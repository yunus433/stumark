const School = require('../../../../models/school/School');

module.exports = (req, res) => {
  if (!req.body || !req.body.name || !req.body.city)
    return res.redirect('/admin');

  const newSchoolData = {
    name: req.body.name,
    city: req.body.city,
    town: req.body.town,
    type: req.body.type,
    other_names: req.body.other_names && req.body.other_names.length ? req.body.other_names.split(',').map(school => school.trim().toLocaleLowerCase()) : []
  };

  const newSchool = new School(newSchoolData);

  newSchool.save(err => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/schools');
  });
}
