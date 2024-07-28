const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  rating: String,
  images: [
    {
      image: String,
    },
  ],
  stock: Number,
  category: String,
  seller: String,
  numOfReviews: String,
  createdAt: Date,
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
