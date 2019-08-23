const User = require('../../../models/user/User');

module.exports = (req, res) => {
  Product.updateMany({
    "profilePhoto": "/res/images/defaultUserPicture.png"
  }, {$set: {
    "profilePhoto": "https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultUserPicture.png"
  }}, err => {
    if (err) return res.redirect('/');

    res.redirect('/admin');
  })
};
