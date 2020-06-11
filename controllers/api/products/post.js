const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  if (!req.body)
    return res.status(400).json({ error: 'bad request' });

  Product.getLatest(req.body, (err, products) => {
    if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

    console.log(products);
    return res.status(200).json({ products });
  });
}
