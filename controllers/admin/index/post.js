const Product = require('../../../models/product/Product');
const Message = require('../../../models/message/Message');

module.exports = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.redirect('/');

    JSON.parse(JSON.stringify(products)).forEach(product => {
        product.messages.forEach(message => {
          const newMessageData = message;
          newMessageData.productId = product._id.toString();

          const newMessage = new Message(newMessageData);
          newMessage.save();
        });
    });
  });

  Product.updateMany({}, {$unset: {
    "messages": ""
  }}, err => {
    if (err) return res.redirect('/');

    res.redirect('/admin');
  })
};
