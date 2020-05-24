const mongoose = require('mongoose');
const moment = require('moment-timezone');

const Schema = mongoose.Schema;

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

const ProductSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  createdAt: {
    type: String,
    default: moment(Date.now()).tz("Europe/Istanbul").format("DD[.]MM[.]YYYY")
  },
  createdAtSecond: {
    type: Number,
    default: Date.now()
  },
  category: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  city_name: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true
  },
  productPhotoArray: {
    type: Array,
    required: true
  },
  chatList: {
    type: Array,
    default: []
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

ProductSchema.statics.getNumberOfProducts = function (params, callback) {
  const Product = this;

  if (params.keywords) {
    const keywordsArr = params.keywords.replace('.', '').replace('!', '').replace('?', '').replace('-', ' ').split(" ");

    if (params.category != "all") {
      if (params.university) {
        Product
          .find({keywords: {$all: keywordsArr}, category: params.category, price: {$ne: "SOLD"}, university: {$in: params.university}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      } else {
        Product
          .find({keywords: {$all: keywordsArr}, category: params.category, price: {$ne: "SOLD"}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      }
    } else {
      if (params.university) {
        Product
          .find({keywords: {$all: keywordsArr}, price: {$ne: "SOLD"}, university: {$in: params.university}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      } else {
        Product
          .find({keywords: {$all: keywordsArr}, price: {$ne: "SOLD"}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      }
    }
  } else {
    if (params.category != "all") {
      if (params.university) {
        Product
          .find({category: params.category, price: {$ne: "SOLD"}, university: {$in: params.university}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      } else {
        Product
          .find({category: params.category, price: {$ne: "SOLD"}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      }
    } else {
      if (params.university) {
        Product
          .find({price: {$ne: "SOLD"}, university: {$in: params.university}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      } else {
        Product
          .find({price: {$ne: "SOLD"}})
          .countDocuments()
          .then((number) => {
            return callback(null, number);
          })
          .catch(err => {
            return callback(err);
          });
      }
    }
  }
}

ProductSchema.statics.getLatest = function (params, callback) {
  const Product = this;

  if (params.keywords) {
    const keywordsArr = (engName(params.keywords).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+");

    if (params.category != "all") {
      if (params.city) {
        Product
          .find({keywords: {$all: keywordsArr}, category: params.category, price: {$ne: "SOLD"}, city: {$in: params.city}})
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
      if (params.city) {
        Product
          .find({keywords: {$all: keywordsArr}, price: {$ne: "SOLD"}, city: {$in: params.city}})
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
      if (params.city) {
        Product
          .find({category: params.category, price: {$ne: "SOLD"}, city: {$in: params.city}})
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
      if (params.city) {
        Product
          .find({price: {$ne: "SOLD"}, city: {$in: params.city}})
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
