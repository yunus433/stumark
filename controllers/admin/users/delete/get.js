const async = require('async');
const mongoose = require('mongoose');

const User = require('../../../../models/user/User');
const Product = require('../../../../models/product/Product');
const Chat = require('../../../../models/chat/Chat');
const School = require('../../../../models/school/School');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  User.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err) return res.redirect('/admin');

    Product.find({
      owner: user._id.toString()
    }, (err, products) => {
      if (err) return res.redirect('/');

      async.times(
        products.length,
        (time, next) => {
          Product.findByIdAndDelete(mongoose.Types.ObjectId(products[time]), err => {
            if (err) return res.redirect('/admin');

            next(null, true);
          });
        },
        err => {
          if (err) return res.redirect('/admin');

          async.times(
            user.buyerChatList.length,
            (time, next) => {
              Chat.findByIdAndDelete(mongoose.Types.ObjectId(user.buyerChatList[time]), (err, chat) => {
                if (err) return next(err);

                User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.owner), {$pull: {
                  ownerChatList: chat._id.toString() 
                }}, {}, err => {
                  if (err) return next(err);

                  return next(null, true);
                });
              });
            },
            err => {
              if (err) return res.redirect('/admin');

              async.times(
                user.ownerChatList.length,
                (time, next) => {
                  Chat.findByIdAndDelete(mongoose.Types.ObjectId(user.ownerChatList[time]), (err, chat) => {
                    if (err) return next(err);
    
                    User.findByIdAndUpdate(mongoose.Types.ObjectId(chat.buyer), {$pull: {
                      buyerChatList: chat._id.toString() 
                    }}, {}, err => {
                      if (err) return next(err);
    
                      return next(null, true);
                    });
                  });
                },
                err => {
                  if (err) return res.redirect('/admin');

                  return res.redirect('/admin/users');
                }
              );
            }
          );
        }
      );
    });
  });
}
