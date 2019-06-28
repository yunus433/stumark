const User = require("../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.body.name) {
    User.findByIdAndUpdate(
      req.session.user._id,
      {
        $set: {
          name: req.body.name
        }
      },
      { new: true },
      (err, user) => {
        if (err) return res.redirect("/");
        req.session.user = user;
        res.redirect("/edit/user");
      }
    );
  } else {
    res.redirect("/");
  }
};
