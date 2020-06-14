const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.find({}, (err, schools) => {
    if (err) return res.status(500).json({ error: 'mongo error: ' + err });

    return res.status(200).json({ schools });
  });
}
