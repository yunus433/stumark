const Message = require('../../../models/message/Message');

 module.exports = (req, res) => {
  Message.find({
    "buyer": req.session.user._id.toString()
  }, (err, buyMessages) => {
    if (err) return res.redirect('/');

    Message.find({
      "owner": req.session.user._id.toString()
    }, (err, sellMessages) => {
      if (err) return res.redirect('/');

      return res.render('messages/dashboard', {
        page: "messages/dashboard",
        title: "Mesajlar",
        includes: {
          external: ["js" ,"css", "fontawesome"]
        },
        buyMessages,
        sellMessages,
        user: req.session.user
      });
    });
  });
};
