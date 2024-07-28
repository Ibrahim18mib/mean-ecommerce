const productModel = require("../models/productModels");

//GET Products API -> api/mib/products
exports.getProducts = async (req, res, next) => {
  //search product using query params
  const query = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const products = await productModel.find(query);

  res.json({
    success: true,
    message: "Get ProductsAPI Working!",
    products,
  });
};

//GET Single Product API -> api/mib/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    res.json({
      success: true,
      message: "Get Single ProductAPI Working!",
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
      // message: 'Unable to get the product with the given ID'
    });
  }
};
