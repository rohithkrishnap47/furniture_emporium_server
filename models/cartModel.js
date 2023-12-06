const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  totalQuantity: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  totalDiscountprice: {
    type: Number
  },
  products: [
    {
      name: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, default: 1, min: 1 },
      price: Number,
    },
  ],
})
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart