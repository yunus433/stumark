const mongoose = require('mongoose');

const Product = require('../../models/product/Product');

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
    const products = [];
    req.query.userFavorites.forEach(id => {
      Product.findById(mongoose.Types.ObjectId(id), (err, product) => {
        if (err)
          return res.status(500).json({ "error": "Mongo Error: " + err });
  
        products.push(product);
      });
    });

    return res.status(200).json({ products });
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
        university: req.query.filter.split(','),
        keywords: req.query.keywords,
        category: req.query.category
      }, (err, products) => { 
        if (err)
          return res.status(500).json({ "error": "Mongo Error: " + err });
  
        Product.getNumberOfProducts({
          university: req.query.filter.split(','),
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
        docsToSkip: parseInt(req.query.page) * parseInt(req.query.limit),
        limit: parseInt(req.query.limit)
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
  } else {
    Product.getLatest({
      keywords: req.query.keywords,
      category: req.query.category,
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
