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
  subcategory: {
    type: String,
    default: "Diğer"
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
    default: []
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
  price_number: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  school: {
    type: String,
    default: null
  }
});

ProductSchema.statics.getNumberOfProducts = function (params, callback) {
  const Product = this;

  const keywords = params.keywords ? (engName(params.keywords).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+") : [];

  const preferences = {
    _id: params.productId ? { $ne: params.productId } : { $ne: null },
    keywords: keywords.length ? { $all: keywords } : { $ne: [] },
    category: params.category != "all" && params.category ? params.category : { $ne: "null" },
    subcategory: params.subcategory != "all" && params.subcategory ? params.subcategory : { $ne: "null" },
    $and: [
      { price_number: (params.price != "Tümü" && params.price ? 
        params.price == "1000+₺" ? { $gte: 1000 } : { $gte: parseInt(params.price.split('-')[0]) }
      : { $ne: -1 }) },
      { price_number: (params.price != "Tümü" && params.price ? 
        params.price == "1000+₺" ? { $gte: 1000 } : { $lte: parseInt(params.price.split('-')[1].replace('₺', '')) }
      : { $ne: -1 }) }
    ],
    city: params.city != "Tümü" && params.city ? { $in: params.city } : { $ne: "null" },
    town: params.town != "Tümü" && params.town ? { $in: params.town } : { $ne: "null" }
  }

  Product
    .find(preferences)
    .countDocuments()
    .then(products => {
      if (products) return callback(null, products);
            
      return callback(true);
    })
    .catch(err => {
      return callback(err);
    });
}

ProductSchema.statics.getLatest = function (params, callback) {
  const Product = this;

  const keywords = params.keywords ? (engName(params.keywords).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+") : [];

  const preferences = {
    _id: params.productId ? { $ne: params.productId } : { $ne: null },
    keywords: keywords.length ? { $all: keywords } : { $ne: [] },
    category: params.category != "all" && params.category ? params.category : { $ne: "null" },
    subcategory: params.subcategory != "all" && params.subcategory ? params.subcategory : { $ne: "null" },
    $and: [
      { price_number: (params.price != "Tümü" && params.price ? 
        params.price == "1000+₺" ? { $gte: 1000 } : { $gte: parseInt(params.price.split('-')[0]) }
      : { $ne: -1 }) },
      { price_number: (params.price != "Tümü" && params.price ? 
        params.price == "1000+₺" ? { $gte: 1000 } : { $lte: parseInt(params.price.split('-')[1].replace('₺', '')) }
      : { $ne: -1 }) }
    ],
    city: params.city != "Tümü" && params.city ? { $in: params.city } : { $ne: "null" },
    town: params.town != "Tümü" && params.town ? { $in: params.town } : { $ne: "null" }
  }

  Product
    .find(preferences)
    .sort({ "price_number": 1 })
    .skip(params.docsToSkip)
    .limit(params.limit)
    .then(products => {
      if (products) return callback(null, products);
            
      return callback(true);
    })
    .catch(err => {
      return callback(err);
    });
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
