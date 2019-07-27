const moment = require('moment');
const Message = require('../../../models/message/Message');

module.exports = (req, res) => {
  const newMessageData = {
    content: req.body.message,
    buyerId: req.session.user._id,
    buyerName: req.session.user.name,
    sendedBy: "buyer",
    productId: req.query.id,
    read: false,
    createdAt: moment(Date.now()).format("[at] HH[:]mm A [/] DD[.]MM[.]YYYY")
  };

  const newMessage = new Message(newMessageData);

  newMessage.save(err => {
    if (err) return res.redirect('/');

    return res.redirect('/messages/buy/?id=' + req.query.id);
  });
};
