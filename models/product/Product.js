const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  createdAt: {
    type: String,
    default: moment(Date.now()).format("dddd, MMMM Do YYYY")
  },
  createdAtSecond: {
    type: Number,
    default: Date.now()
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  productPhotoArray: {
    type: Array,
    required: true
  },
  keywords: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  buyer: {
    type: String
  },
  university: {
    type: String,
    required: true
  }
});

ProductSchema.statics.getNumberOfProducts = function (category, keywordsForProduct, callback) {
  const Product = this;

  if (keywordsForProduct) {
    const keywordsArr = keywordsForProduct.split(" ");

    if (category != "all") {
      Product
        .find({category, keywords: {$all: keywordsArr}})
        .countDocuments()
        .then(number => {
          return callback(null, number);
        })
        .catch(err => {
          return callback(err);
        });
    } else {
      Product
        .find({keywords: {$all: keywordsArr}})
        .countDocuments()
        .then(number => {
          return callback(null, number);
        })
        .catch(err => {
          return callback(err);
        });
    }
  } else {
    if (category != "all") {
      Product
        .find({category})
        .countDocuments()
        .then(number => {
          return callback(null, number);
        })
        .catch(err => {
          return callback(err);
        });
    } else {
      Product
        .find({})
        .countDocuments()
        .then(number => {
          return callback(null, number);
        })
        .catch(err => {
          return callback(err);
        });
    }
  }
}

ProductSchema.statics.getLatest = function (params, callback) {
  const Product = this;

  if (params.keywords) {
    const keywordsArr = params.keywords.replace('.', '').replace('!', '').replace('?', '').replace('-', ' ').split(" ");

    if (params.category != "all") {
      if (params.university) {
        Product
          .find({keywords: {$all: keywordsArr}, category: params.category, price: {$ne: "SOLD"}, university: {$in: params.university}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        Product
          .find({keywords: {$all: keywordsArr}, category: params.category, price: {$ne: "SOLD"}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      }
    } else {
      if (params.university) {
        Product
          .find({keywords: {$all: keywordsArr}, price: {$ne: "SOLD"}, university: {$in: params.university}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        Product
          .find({keywords: {$all: keywordsArr}, price: {$ne: "SOLD"}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      }
    }
  } else {
    if (params.category != "all") {
      if (params.university) {
        Product
          .find({category: params.category, price: {$ne: "SOLD"}, university: {$in: params.university}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        Product
          .find({category: params.category, price: {$ne: "SOLD"}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      }
    } else {
      if (params.university) {
        Product
          .find({price: {$ne: "SOLD"}, university: {$in: params.university}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        Product
          .find({price: {$ne: "SOLD"}})
          .sort({"createdAtSecond": -1})
          .skip(params.docsToSkip)
          .limit(params.limit)
          .then((products) => {
            if (products) return callback(null, products);
            
            return callback(true);
          })
          .catch(err => {
            callback(err);
          });
      }
    }
  }
};

ProductSchema.statics.sortByProductPhotoIndex = function (id, callback) {
  const Product = this;
  
  Product
    .findById(id, (err, product) => {
      if (err) return callback(true);

      let array = product.productPhotoArray;
      array.sort((a, b) => {
        return a.productIndex > b.productIndex
      });

      Product
        .findByIdAndUpdate(id, {$set: {
          "productPhotoArray": array
        }}, err => {
          if (err) return callback(true);

          return callback(false);
        });
    });
};

module.exports = mongoose.model('Product', ProductSchema);
