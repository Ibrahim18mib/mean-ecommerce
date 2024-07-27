const mongoose = require("mongoose");

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  cart: [
    {
      product: {
        type: Object,
        ref: "Order", // Reference to the Order model
        required: true,
      },
      qty: {
        type: String,
        required: true,
      },
    },
  ],
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
