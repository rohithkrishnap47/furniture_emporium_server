const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Order = mongoose.model("Order", cartSchema);
module.exports = Order