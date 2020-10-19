const School = require('../../../models/school/School');

module.exports = (req, res) => {
  if (!req.query || !req.query.updates)
    return res.redirect('/admin');

  School.find({
    type: "Üniversite"
  }, (err, schools) => {
    if (err) return res.redirect('/admin');

    return res.json({
      schools: schools.map(school => {
        return {
          name: school.name,
          city: school.city,
          town: school.town
        }
      })
    });
  });
}
