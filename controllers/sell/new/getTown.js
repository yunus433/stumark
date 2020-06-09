const getCityTowns = require('../../../utils/getCityTowns');

module.exports = (req, res) => {
  if (!req.query || !req.query.city)
    return res.sendStatus(400);

  res.write(getCityTowns(req.query.city).join('+'));
  return res.end();
}
