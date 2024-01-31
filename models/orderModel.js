const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
    },
    product: {
        type: Array,
        ref: "Product"
    },
    deliveryAddress: {
        type: mongoose.Types.ObjectId,
        ref: "Address"
    },
    cartDetails: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    paymentMethod: {
        type:String 
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Success"],
        default:"Pending"
    },
    totalAmount:{
        type:Number
    },
    couponUsed: {
        type: mongoose.Types.ObjectId,
        ref: "Coupon"
    },
    orderedDate:{
        type:Date,
        default:Date.now()
    },
    deliveredDate:{
        type:Date,
        default:null
    },
    deliveryStatus:{
        type:String,
        enum:["Pending", "Processing", "Shipped", "Delivered"],
        default:"Pending"
    }
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order  