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
  productPhotoArray: {
    type: Array,
    default: [
      {productIndex: 0, source: "/res/images/notAvailablePhoto.jpg"},
      {productIndex: 1, source: "/res/images/notAvailablePhoto.jpg"},
      {productIndex: 2, source: "/res/images/notAvailablePhoto.jpg"},
      {productIndex: 3, source: "/res/images/notAvailablePhoto.jpg"},
      {productIndex: 4, source: "/res/images/notAvailablePhoto.jpg"}
    ]
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
    type: Object,
    required: true
  },
  buyer: {
    type: Object
  },
  messages: {
    type: Object,
    default: {}
  }
});

ProductSchema.statics.getLatest = function (docsToSkip, callback) {
  let Product = this;

  if (docsToSkip > 0) {
    Product
      .find({})
      .sort({"createdAtSecond": -1})
      .skip(docsToSkip)
      .limit(50)
      .then((products) => {
        if (products) return callback(null, products);
        
        return callback(true);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    Product
      .find({})
      .sort({"createdAtSecond": -1})
      .limit(50)
      .then((products) => {
        if (products) return callback(null, products);
        
        return callback(true);
      })
      .catch(err => {
        callback(err);
      });
  }
};

ProductSchema.statics.getLatestWithKeywords = function (docsToSkip, keywords, callback) {
  let Product = this;
  const keywordsArr = keywords.split(" ");

  if (docsToSkip > 0) {
    Product
      .find({keywords: {$all: keywordsArr}})
      .sort({"createdAtSecond": -1})
      .skip(docsToSkip)
      .limit(50)
      .then((products) => {
        if (products) return callback(null, products);
        
        return callback(true);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    Product
      .find({keywords: {$all: keywordsArr}})
      .sort({"createdAtSecond": -1})
      .limit(50)
      .then((products) => {
        if (products) return callback(null, products);
        
        return callback(true);
      })
      .catch(err => {
        callback(err);
      });
  }
};

ProductSchema.statics.sortByProductPhotoIndex = function (id, callback) {
  let Product = this;
  
  Product
    .findById(id, (err, product) => {
      if (err) return callback(true);

      let array = product.productPhotoArray;
      array.sort((a, b) => {
        return a.productIndex > b.productIndex
      });
      console.log(array);

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
