const bcrypt = require('bcrypt');

module.exports = function (password, password2, callback) {
  bcrypt.compare(password, password2, (res) => {
    if (!res) return callback(false);
    callback(true);
  });
};
