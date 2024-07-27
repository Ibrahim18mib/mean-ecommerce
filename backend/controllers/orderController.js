const orderModel = require("../models/orderModels");

const productModel = require("../models/productModels");

// POST - CREATE Order API -> /api/mib/order
exports.createOrder = async (req, res, next) => {
  try {
    console.log(req.body, "DATA");

    const cart = req.body;

    // if (!Array.isArray(cart) || cart.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Cart items are required.",
    //   });
    // }

    // Validate cart items
    // for (const item of cartItems) {
    //   if (!item.product || !item.product.price || !item.qty) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Invalid cart item data.",
    //     });
    //   }
    // }

    const amount = Number(
      cart.reduce((acc, item) => acc + item.product.price * item.qty, 0)
    ).toFixed(2);

    console.log(amount, "amount");

    const status = "Pending";

    // Create order
    const order = await orderModel.create({ cart, amount, status });

    //Updating the Product Stock
    cart.forEach(async (item) => {
      const product = await productModel.findById(item.product._id);
      product.stock = product.stock - item.qty;
      await product.save();
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to create order.",
    });
  }
};
