const mongoose = require('mongoose');

const User = require('../../../models/user/User');

const sendNotification = require('../../../utils/sendNotification');

module.exports = (req, res) => {
  const messages = [];

  User.find({
    "notificationToken": {$ne: null}
  }, (err, users) => {
    if (err) return res.redirect('/');

    users.forEach(user => {
      if (user.notificationToken)
        messages.push({
          "to": user.notificationToken,
          "body": req.body,
          "data": "Click to see the message"
        });
    });

    sendNotification('send many', {messages}, (err, result) => {
      if (err) return res.redirect('/');

      return res.redirect('/admin');
    })
  });
}
