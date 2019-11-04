const Message = require("../../../models/message/Message");

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
          createdAt: moment(req.body.createdAt).format("HH[:]mm A [/] DD[.]MM[.]YYYY"),
          read: false } ]
      };

      const newMessage = new Message(newMessageData);
    
      newMessage.save(err => {
        if (err) return res.status(500).json({ "error": "Mongo Error: " + err });
    
        return res.status(200).json({"success": true});
      });
  } else {
    return res.status(400).json({"error": "Bad request"});
  }
};
