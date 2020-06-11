const mongoose = require('mongoose');
const async = require('async');

const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  if (!req.query || !req.query.category)
    req.query.category = "all";
  
  if (!req.query || !req.query.page)
    req.query.page = "0";
    
  if (req.query && req.query.id) {
    Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ product });
    });
  } else if (req.query && req.query.userFavorites) {
    async.times(
      req.query.userFavorites.split(',').length,
      (time, next) => {
        Product.findById(mongoose.Types.ObjectId(req.query.userFavorites.split(',')[time]), (err, product) => {
          if (err) return next(err);

          next(null, product);
        });
      },
      (err, products) => {
        if (err) return res.status(500).json({ "error": err });

        return res.status(200).json({ products: products.filter(product => product && product._id) });
      }
    );
  } else if (req.query && req.query.owner) {
    Product.find({
      "owner": req.query.owner
    }, (err, products) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      return res.status(200).json({ products });
    })
  } else if (req.query && req.query.limit) {
    if (req.query.filter) {
      Product.getLatest({
        city: req.query.filter.split(','),
        keywords: req.query.keywords,
        category: req.query.category,
        subcategory: "all"
      }, (err, products) => { 
        if (err)
          return res.status(500).json({ "error": "Mongo Error: " + err });
  
        Product.getNumberOfProducts({
          city: req.query.filter.split(','),
          keywords: req.query.keywords,
          category: req.query.category,
          docsToSkip: parseInt(req.query.page) * parseInt(req.query.limit),
          limit: parseInt(req.query.limit)
        }, (err, number) => { 
          if (err)
            return res.status(500).json({ "error": "Mongo Error: " + err });
  
            return res.status(200).json({ products, number });
        });
      });
    } else {
      Product.getLatest({
        keywords: req.query.keywords,
        category: req.query.category,
        subcategory: "all",
        docsToSkip: parseInt(req.query.page) * parseInt(req.query.limit),
        limit: parseInt(req.query.limit)
      }, (err, products) => { 
        if (err)
          return res.status(500).json({ "error": "Mongo Error: " + err });
  
        Product.getNumberOfProducts({
          keywords: req.query.keywords,
          category: req.query.category,
          subcategory: "all",
        }, (err, number) => { 
          if (err)
            return res.status(500).json({ "error": "Mongo Error: " + err });
  
            return res.status(200).json({ products, number });
        });
      });
    }
  } else {
    Product.getLatest({
      keywords: req.query.keywords,
      category: req.query.category,
      subcategory: "all",
      docsToSkip: parseInt(req.query.page) * parseInt(req.query.limit),
      limit: 999999999
    }, (err, products) => { 
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      Product.getNumberOfProducts({
        keywords: req.query.keywords,
        category: req.query.category
      }, (err, number) => { 
        if (err)
          return res.status(500).json({ "error": "Mongo Error: " + err });

          return res.status(200).json({ products, number });
      });
    });
  }
};
