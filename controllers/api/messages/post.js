const moment = require('moment-timezone');

const Message = require('../../../models/chat/Chat');

const sendNotification = require('../../../utils/sendNotification');

module.exports = (req, res, next) => {
  if ( req.body && req.body.buyer && req.body.buyerName && req.body.owner && req.body.ownerName
    && req.body.product && req.body.productName && req.body.productPhoto && req.body.content && req.body.createdAt ) {
      const newMessageData = {
        buyer: req.body.buyer,
        buyerName: req.body.buyerName,
        owner: req.body.owner,
        ownerName: req.body.ownerName,
        product: req.body.product,
        productName: req.body.productName,
        productPhoto: req.body.productPhoto,
        messages: [ {
          content: req.body.content,
          sendedBy: "buyer",
          createdAt: moment(req.body.createdAt).tz("Europe/Berlin").format("HH[:]mm A [/] DD[.]MM[.]YYYY"),
          read: false } ]
      };

      const newMessage = new Message(newMessageData);
    
      newMessage.save(err => {
        if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
        
        sendNotification('sendOne', {
          "to": req.body.owner,
          "messages": [{
            body: `Du hast eine neue Nachricht für dein Produkt ${req.body.productName}`, 
            data: "Click to see the message"
          }]
        }, (err, result) => {
          if (err) console.log(err);

          return res.status(200).json({"success": true});
        });
      });
  } else {
    return res.status(400).json({"error": "Bad request"});
  }
};
