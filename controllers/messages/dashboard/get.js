const _ = require('lodash');
const async = require('async');

const Product = require('../../../models/product/Product');
const Message = require('../../../models/message/Message');

 module.exports = (req, res) => {
  Message.find({
    "buyerId": req.session.user._id.toString()
  }, (err, buyMessages) => {
    if (err) return res.redirect('/');

    if (buyMessages.length > 0) {
      const buyProductIds = Object.values(_.groupBy(buyMessages, message => { return message.productId }));
      
      async.times(
        buyProductIds.length,
        (time, next) => {
          Product.findById(buyProductIds[time][0].productId, (err, returnedProduct) => {
            returnedProduct.notReadMessageNumber = buyProductIds[time].filter(message => { return !message.read && message.sendedBy == "owner" }).length;

            next(err, returnedProduct);
          });
        },
        (err, buyProducts) => { 
          if (err) return res.redirect('/');
  
          Product.find({"owner": req.session.user._id}, (err, sellProducts) => {
            if (err) return res.redirect('/');

            async.times(
              sellProducts.length,
              (time, next) => {
                Message.find({
                  "productId": sellProducts[time]._id.toString(),
                  "sendedBy": "buyer",
                  "read": false
                }, (err, notReadSellMessages) => {
                  sellProducts[time].notReadMessageNumber = notReadSellMessages.length;
                  next(err, sellProducts[time]);
                });
              },
              (err, sellProducts) => {
                if (err) return res.redirect('/');

                return res.render('messages/dashboard', {
                  page: "messages/dashboard",
                  title: "Nachrichten",
                  includes: {
                    external: ["js" ,"css", "fontawesome"]
                  },
                  buyProducts,
                  sellProducts,
                  user: req.session.user
                });
              });
          });
        });
    } else {
      Product.find({"owner": req.session.user._id}, (err, sellProducts) => {
        if (err) return res.redirect('/');

        async.times(
          sellProducts.length,
          (time, next) => {
            Message.find({
              "productId": sellProducts[time]._id.toString(),
              "read": false
            }, (err, notReadSellMessages) => {
              sellProducts[time].notReadMessageNumber = notReadSellMessages.length;
              next(err, sellProducts[time]);
            });
          },
          (err, sellProducts) => {
            if (err) return res.redirect('/');

            return res.render('messages/dashboard', {
              page: "messages/dashboard",
              title: "Nachrichten",
              includes: {
                external: ["js" ,"css", "fontawesome"]
              },
              buyProducts: [],
              sellProducts,
              user: req.session.user
            });
          });
      });
    };
  });
};
