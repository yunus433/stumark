const User = require("../../../models/user/User");

module.exports = (req, res, next) => {
  if (
    req.body &&
    req.body.oldPassword &&
    req.body.password &&
    req.body.password2
  ) {
    if (req.body.password != req.body.password2) {
      bcrypt.compare(
        req.body.oldPassword,
        req.session.user.password,
        (err, result) => {
          if (err || !result) {
            req.session.error = "wrong password";
            return res.redirect("/edit/user");
          } else {
            User.findById(req.session.user._id, (err, user) => {
              if (err || !user) return res.redirect("/");

              user.password = req.body.password;
              user.save((err, newUser) => {
                if (err) return res.redirect("/");

                req.session.user.password = newUser.password;
                return res.redirect("/");
              });
            });
          }
        }
      );
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};
