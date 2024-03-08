const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Auth",
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
}, { timestamps: true })
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart