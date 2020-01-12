const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("name _id productImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        poze: docs.map(doc => {
          return {
            name: doc.name,
            productImage: doc.productImage,
            _id: doc._id,
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    productImage: req.body.url
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          _id: result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  Product.updateOne({ _id: id }, {$set: {"productImage": req.body.url, "name":req.body.name}})
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Product updated"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
  
};

exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Product deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
